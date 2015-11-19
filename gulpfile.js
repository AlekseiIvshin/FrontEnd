'use strict';
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyHTML = require('gulp-minify-html');

var sourcePath = './src';
var buildPath = './dist';


gulp.task('default', ['deploy']);

gulp.task('deploy-release',['minify-js','minify-html','sass','moveResources']);

gulp.task('deploy',['sass','moveViews','moveResources','minify-js']);

gulp.task('webserver', ['deploy-release'], function() {
  gulp.src('dist')
    .pipe(webserver({
      liveload: true,
      directoryListing: true,
      open: 'http://localhost:8000/views/Pool.html'
	}));
});

gulp.task('moveResources',['moveFonts','moveImages']);

gulp.task('moveViews', function() {
    gulp.src(sourcePath+'/views/**').pipe(gulp.dest(buildPath+'/views'))
});

gulp.task('moveFonts', function() {
  gulp.src(sourcePath+'/fonts/**').pipe(gulp.dest(buildPath+'/fonts'))
});

gulp.task('moveImages', function() {
  gulp.src(sourcePath+'/images/**').pipe(gulp.dest(buildPath+'/images'))
});

gulp.task('sass', function () {
  gulp.src([sourcePath+'/sass/**/*.scss','!./src/sass/**/*base.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(buildPath+'/styles'));
});

gulp.task('sass:watch', function () {
  gulp.watch(sourcePath+'/sass/**/*.scss', ['sass']);
});

gulp.task('minify-js', function() {
  return gulp.src(sourcePath+'/js/*.js')
    .pipe(gulp.dest(buildPath+'/js'));
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src(sourcePath+'/views/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(buildPath+'/views/'));
});
