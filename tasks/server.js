var exec = require("child_process").exec;
var gulp = require("gulp");

gulp.task("server", function (cb) {
    exec("node express-rest-api-example.js", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
