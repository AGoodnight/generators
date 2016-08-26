'use strict'

const globals = require('./globals.js');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const debug = require('gulp-debug');

const tasks = function(gulp,plugins,path){
  gulp.task('compile-sass',function(){

  	// Run Sass Compiler on our scss
    return gulp.src(['./scss/main/global.scss'])
	    .pipe(debug())
	    .pipe(rename('app.css'))
	    .pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest(globals.temp_dir))
  });

  gulp.task('concat-sass',['compile-sass'],function(){

  	console.log(globals.temp_dir)

	// Concat our css file with any bower css files
	return gulp.src([globals.bower_dir+'/bootstrap/dist/css/bootstrap.css',
					globals.temp_dir+'/app.css'])
		.pipe(debug())
		.pipe(concat('./app.css'))
		.pipe(gulp.dest(globals.css_dir));
  });

  gulp.task('compile-styles',['concat-sass']);
};

module.exports = tasks;
