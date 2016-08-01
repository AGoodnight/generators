'use strict'

const globals = require('./globals.js');

const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const order = require("gulp-order");
const mainBowerFiles = require('gulp-main-bower-files');
const removeFiles = require('gulp-remove-files');

const tasks = function(gulp,plugins,path){

	gulp.task('main-bower-files', function() {
		console.log(globals.temp_dir)
	    return gulp.src('./bower.json')
	        .pipe(mainBowerFiles())
	        .pipe(gulp.dest(globals.temp_dir));
	});

	gulp.task('clear-temp',function(){
		gulp.src(globals.temp_dir+'*')
			.pipe(removeFiles());
	});

	gulp.task('ugilify-scripts',['clear-temp','concat-angular'],function(cb){
    	gulp.src(globals.temp_dir+'**/*.js')
			.pipe(rename('all.js'))
		    .pipe(uglify())
		    .pipe(gulp.dest(globals.script_dist_dir))
	});

	gulp.task('concat-angular',['main-bower-files'],function(cb){

		console.log('*** Minimizing Build');

		return gulp.src([
				globals.script_dir+'**/*.js'
			])
			.pipe(order([
				'app.js',
				'config.js',
				'services/service.js'
			]))
			.pipe(concat('angular.js'))
			.pipe(gulp.dest(globals.temp_dir));
	});

	gulp.task('minimize-build',['ugilify-scripts'],function(cb){
		
	});

};

module.exports = tasks;
