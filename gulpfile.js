"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const reactNativeStylesheetCss = require("hgs-gulp-react-native-stylesheet-css");

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

gulp.task("scss:reactNative", function () {
  return gulp
    .src("./scss/tail-react-native.scss")
    .pipe(sass())
    .pipe(reactNativeStylesheetCss())
    .pipe(rename("index.js"))
    .pipe(gulp.dest("./react-native"));
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
  gulp.series("scss:min", "scss:compact", "scss:reactNative", (done) => {
    done();
  })
);
