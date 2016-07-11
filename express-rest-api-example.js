var bodyParser     = require("body-parser");
var compression    = require("compression");
var cors           = require("cors");
var express        = require("express");
var mongoose       = require("mongoose");

//  Private credentials
var credentials    = require("./credentials.js");

//  Router
var router         = require("./router.js");

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

//  Set up processing of forms and JSON
app.use(bodyParser.urlencoded({ "extended": true }));
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

//  Register the API router and prefix its URLs with "/api"
app.use("/api", router);

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
