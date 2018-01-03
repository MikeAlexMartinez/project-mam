'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const include = require('gulp-include');
const sass = require('gulp-sass');

const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');

/**
 * Copy font files
 **/
gulp.task('copyfonts', function() {
  gulp.src('./node_modules/ionicons/dist/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('./public/fonts/ionicons'));
});

/**
 * The JS gulp task
 **/
gulp.task("js", function() {
  gulp.src("./src/js/main.js")
    .pipe(include({
      includePaths: [
        __dirname + "/node_modules/jquery/dist",
        __dirname + "/node_modules/masonry-layout/dist",
        __dirname + "/node_modules/animsition/dist/js"
      ]
    })).on('error', console.log)
    .pipe(gulp.dest("./public/js"));
});

/** 
 *  Sass compiling gulp task allows for including node_modules and also writes
 *  sourcmaps to allow for easier debugging.
 **/
gulp.task('sass', function() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  gulp.start('copyfonts');
  gulp.watch(['./src/sass/*.scss',
              './src/sass/**/*.scss'
            ], ['sass']);
  gulp.watch(['./src/js/*.js'], ['js']);
});

gulp.task('default', ['copyfonts','sass','js']);