var bodyParser     = require("body-parser");
var compression    = require("compression");
var cors           = require("cors");
var express        = require("express");
var rest           = require("connect-rest");
var slashes        = require("connect-slashes");
var uncapitalize   = require("express-uncapitalize");

var Element        = require("./models/element.js");

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

//  Set up form handling
app.use(bodyParser.urlencoded({ extended: true }));

//  Enable CORS for just the /api directory
app.use("/api", cors());

//  API configuration
var apiOptions = {
    "context": "/api"
};

//  Link API into pipeline
app.use(rest.rester(apiOptions));

//  View all elements
rest.get("/elements", function(req, content, cb) {
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
rest.post("/element", function(req, content, cb) {
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
rest.get("/element/:id", function(req, content, cb) {
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
