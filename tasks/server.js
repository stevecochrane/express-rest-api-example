var gulp    = require("gulp");
var nodemon = require("gulp-nodemon");

//  Start our server, and restart it when any changes are made to the watched files.
gulp.task("server", function() {
    nodemon({
        script: "express-rest-api-example.js",
        tasks: ["tests"],
        watch: ["express-rest-api-example.js"]
    });
});
