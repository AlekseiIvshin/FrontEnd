'use strict';
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('minify', function() {
  return gulp.src('client/js/**/*.js')
    .pipe(gulp.dest('build'));
});

gulp.task('deploy-release',['minify','deploy']);

gulp.task('deploy',['sass'], function() {
  return gulp.src(['./src/**/*','!./src/sass','!./src/sass/**'])
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['minify']);

gulp.task('webserver', ['copySrc2Dist'], function() {
  gulp.src('dist')
    .pipe(webserver({
      liveload: true,
      directoryListing: true,
      open: 'http://localhost:8000/views/Pool.html'
	}));
});

gulp.task('sass', function () {
  gulp.src(['./src/sass/**/*.scss','!./src/sass/**/*base.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});
