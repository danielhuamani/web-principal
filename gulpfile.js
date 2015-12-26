var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var http = require('http');
var st = require('st');
var livereload = require('gulp-livereload');

var directorio = {
	jade: ['./templates/jade/*.jade'],
	stylus: ['./static/stylus/styles.styl']

};


gulp.task('stylus', function () {
  gulp.src(directorio.stylus)
  	.pipe(plumber())
    .pipe(stylus({
      compress: true
      }))
    .pipe(gulp.dest('./static/css/'))
    .pipe(livereload());
});


gulp.task('templates', function() {

  gulp.src(directorio.jade)
  	.pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('./templates/html'))
    .pipe(livereload());
});

gulp.task('watch', ['server'], function() {
	livereload.listen();
	gulp.watch('./static/stylus/styles.styl', ['stylus']),
	gulp.watch('./templates/jade/*.jade', ['templates'])
});

//creacioon  del server para el livereload
gulp.task('server', function(done) {
	http.createServer(
		st({ path: __dirname + '/templates/html', index: 'index.html', cache: false })
		).listen(3000, done)
});

gulp.task('default', ['stylus', 'templates', 'watch']);


