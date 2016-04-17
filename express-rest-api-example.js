var compression    = require("compression");
var cors           = require("cors");
var express        = require("express");
var slashes        = require("connect-slashes");
var uncapitalize   = require("express-uncapitalize");

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

//  Enable CORS for just the /api directory
app.use("/api", cors());

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
