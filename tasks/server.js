var gulp    = require("gulp");
var nodemon = require("gulp-nodemon");

//  Start our server, and restart it when any changes are made to the watched files.
gulp.task("server", function() {
    nodemon({
        script: "html-reference-api.js",
        tasks: ["tests"],
        watch: ["html-reference-api.js"]
    });
});
