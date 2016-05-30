var bodyParser     = require("body-parser");
var compression    = require("compression");
var cors           = require("cors");
var express        = require("express");
var mongoose       = require("mongoose");
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

//  Enforce lowercase for all URLs
app.use(uncapitalize());

//  Set up processing of forms and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  Enable CORS for just the /api directory
app.use("/api", cors());

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

//  Set up our router
var router = express.Router();

//  For routes ending with "/elements"
router.route("/elements")

    //  Post a new element (accessed with POST at http://localhost:3000/api/elements)
    .post(function(req, res) {
        var element = new Element();
        element.name = req.body.name;
        element.description = req.body.description;

        // save the element and check for errors
        element.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ "message": "Element created!" });
        });
    })

    //  View all elements (accessed with GET at http://localhost:3000/api/elements)
    .get(function(req, res) {
        Element.find(function(err, elements) {
            if (err) {
                res.send(err);
            }
            res.json(elements);
        });
    });

//  For routes ending with "/elements/:element_id"
router.route("/elements/:element_id")

    //  View a specific element (accessed with GET at http://localhost:3000/api/elements/:element_id)
    .get(function(req, res) {
        Element.findById(req.params.element_id, function(err, element) {
            if (err) {
                res.send(err);
            }
            res.json(element);
        });
    });

//  Handle 404 errors
app.use(function(req, res) {
    res.type("text/plain");
    res.status(404);
    res.send("404 - Not Found");
});

//  Handle 500 errors
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type("text/plain");
    res.status(500);
    res.send("500 - Server Error");
});

app.listen(app.get("port"), function() {
    console.log("Express started on http://localhost:" + app.get("port") + "; press Ctrl-C to terminate.");
});
