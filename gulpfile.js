var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
var historyApiFallback = require('connect-history-api-fallback');
var directorio = {

  jade: ['app/templates/jade/*.jade'],
  stylus: ['app/static/stylus/styles.styl']

};

gulp.task('stylus', function () {
  gulp.src(directorio.stylus)
    .pipe(plumber())
    .pipe(stylus({
      compress: true
      }))
    .pipe(gulp.dest('app/static/css/'))
    .pipe(connect.reload());

});


gulp.task('templates', function() {

  return gulp.src(directorio.jade)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
      }))
    .pipe(gulp.dest('app/templates/html'))
    .pipe(connect.reload());


});

gulp.task('watch', function() {

	gulp.watch('app/static/stylus/styles.styl', ['stylus']),
	gulp.watch('app/templates/jade/*.jade', ['templates'])
});

//creacioon  del server para el livereload

gulp.task('connect', function() {
  connect.server({
    root: 'app/',
    hostname: '0.0.0.0',
    livereload: true,
    port: '3000',
    open: true,
    middleware: function(connect, opt) {
      return [ historyApiFallback() ];
    }
  });
});
gulp.task('default', ['stylus', 'templates', 'watch', 'connect']);
//creacioon  del server para el livereload
