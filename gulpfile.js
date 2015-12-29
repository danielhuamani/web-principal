var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var http = require('http');
var st = require('st');
var livereload = require('gulp-livereload');
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
   // .pipe(livereload());
});


gulp.task('templates', function() {

  gulp.src(directorio.jade)
  	.pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('app/templates/html'))
    .pipe(connect.reload());
    //.pipe(livereload());
});

gulp.task('watch', function() {
	//livereload.listen();
	gulp.watch('app/static/stylus/styles.styl', ['stylus']),
	gulp.watch('app/templates/jade/*.jade', ['templates'])
});

//creacioon  del server para el livereload
gulp.task('server', function(done) {
	http.createServer(
		st({ path: __dirname + '/templates/html', index: 'index.html', cache: false })
		).listen(3000, done)
});
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


