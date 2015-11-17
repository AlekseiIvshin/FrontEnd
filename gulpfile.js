var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('minify', function() {
  return gulp.src('client/js/**/*.js')
    .pipe(gulp.dest('build'));
});

gulp.task('copySrc2Dist', function() {
  return gulp.src('./src/**/*')
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
