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
	    .pipe(gulp.dest('./temp/css'))
  });

  gulp.task('concat-sass',['compile-sass'],function(){

	// Concat our css file with any bower css files
	return gulp.src([globals.bower_dir+'/bootstrap/dist/css/bootstrap.css',
					globals.temp_dir+'/css/app.css'])
		.pipe(debug())
		.pipe(concat('./app.css'))
		.pipe(gulp.dest('../webapp/css'));
  });

  gulp.task('compile-styles',['concat-sass']);
};

module.exports = tasks;
