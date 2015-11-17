'use strict';
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

gulp.task('minify', function() {
  return gulp.src('client/js/**/*.js')
    .pipe(gulp.dest('build'));
});

gulp.task('copySrc2Dist', function() {
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
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});
