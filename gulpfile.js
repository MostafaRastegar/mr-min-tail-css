"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");

sass.compiler = require("node-sass");

gulp.task("scss:min", function () {
  return gulp
    .src("./scss/tail.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename("tail.min.css"))
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./css"));
});

gulp.task("scss:compact", function () {
  return gulp
    .src("./scss/tail.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compact" }).on("error", sass.logError))
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./css"));
});

gulp.task("scss:watch", function () {
  gulp.watch("./scss/**/*.scss", ["sass"]);
});

gulp.task(
  "build",
  gulp.series("scss:min", "scss:compact", (done) => {
    done();
  })
);
