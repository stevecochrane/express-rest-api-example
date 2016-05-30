var bodyParser     = require("body-parser");
var compression    = require("compression");
var cors           = require("cors");
var express        = require("express");
var mongoose       = require("mongoose");
var Rest           = require("connect-rest");
var slashes        = require("connect-slashes");
var uncapitalize   = require("express-uncapitalize");

//  Private credentials
var credentials    = require("./credentials.js");

//  Mongoose database schema
var Element        = require("./models/element.js");

//  Initialize Express
var app = express();

//  Treat "/foo" and "/Foo" as different URLs
app.set("case sensitive routing", true);

//  Treat "/foo" and "/foo/" as different URLs
app.set("strict routing", true);

//  Default to port 3000
app.set("port", process.env.PORT || 3000);

//  Compress all requests
app.use(compression());

//  Enforce trailing slashes for all URLs
app.use(slashes());

//  Enforce lowercase for all URLs
app.use(uncapitalize());

//  Set up processing of forms and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  Enable CORS for just the /api directory
app.use("/api", cors());

//  API configuration
var apiOptions = {
    "context": "/api"
};

//  Database configuration
var dbOptions = {
    "server": {
        "socketOptions": {
            "keepAlive": 1
        }
    }
};

//  Set up Mongo database connection
switch(app.get("env")) {
    case "development":
        mongoose.connect(credentials.mongo.development.connectionString, dbOptions);
        break;
    case "production":
        mongoose.connect(credentials.mongo.production.connectionString, dbOptions);
        break;
    default:
        throw new Error("Unknown execution environment: " + app.get("env"));
}

//  Link API into pipeline
var rest = Rest.create(apiOptions);
app.use(rest.processRequest());

//  View all elements
rest.get("/elements/", function(req, content, cb) {
    Element.find({}, function(err, elements) {
        if (err) {
            return cb({ "error": "Internal error."});
        }
        cb(null, elements.map(function(element) {
            return {
                "name": element.name,
                "description": element.description
            };
        }));
    });
});

//  Post a new element
rest.post("/element/", function(req, content, cb) {
    var element = new Element({
        "name": req.body.name,
        "description": req.body.description
    });
    element.save(function(err, element) {
        if (err) {
            return cb({ "error": "Unable to add element." });
        }
        cb(null, {
            "id": element._id
        });
    });
});

//  View a specific element
rest.get("/element/:id/", function(req, content, cb) {
    Element.findById(req.params.id, function(err, element) {
        if (err) {
            return cb({ "error": "Unable to retrieve element." });
        }
        cb(null, {
            "name": element.name,
            "description": element.description
        });
    });
});

//  Custom 404 page
app.use(function(req, res) {
    res.type("text/plain");
    res.status(404);
    res.send("404 - Not Found");
});

//  Custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type("text/plain");
    res.status(500);
    res.send("500 - Server Error");
});

app.listen(app.get("port"), function() {
    console.log("Express started on http://localhost:" + app.get("port") + "; press Ctrl-C to terminate.");
});
