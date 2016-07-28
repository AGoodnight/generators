'use strict'

const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const order = require("gulp-order");

let script_dir = './app/';
let temp_dir = '../staticResources/temp/';
let script_dist_dir = '../webapp/scripts/';

const tasks = function(gulp,plugins,path){

  gulp.task('ugilify-scripts',['concat-angular'],function(cb){
    return gulp.src(temp_dir+'*.js')
		.pipe(rename('all.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest(script_dist_dir));
  });

  gulp.task('concat-angular',function(cb){

	console.log('*** Minimizing Build');

	return gulp.src([
			script_dir+'**/*.js'
		])
		.pipe(order([
			'app.js',
			'config.js',
			'services/service.js'
		]))
		.pipe(concat('angular.js'))
		.pipe(gulp.dest(temp_dir));
  });

  gulp.task('minimize-build',['ugilify-scripts','concat-angular']);

};

module.exports = tasks;
