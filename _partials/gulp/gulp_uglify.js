'use strict'

const globals = require('./globals.js');

const uglify = require('gulp-uglifyjs');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const order = require("gulp-order");
const mainBowerFiles = require('main-bower-files');
const removeFiles = require('gulp-remove-files');
const debug = require('gulp-debug');
const filter = require('gulp-filter');
const complexity = require('gulp-complexity');

const tasks = function(gulp,plugins,path){

	gulp.task('main-bower-files', function() {

		// Here we will minimize all our Bower libraries
	    return gulp.src(mainBowerFiles())
	        .pipe(debug())
	        .pipe(filter('**/*.js'))
	        .pipe(concat('./bower.js'))
	        .pipe(uglify())
	        .pipe(gulp.dest(globals.temp_dir));
	});

	gulp.task('clear-temp',function(){

		// Empty out old compile folders
		return gulp.src(globals.temp_dir+'*')
			.pipe(debug())
			.pipe(removeFiles());
	});

	gulp.task('concat-angular',['main-bower-files'],function(cb){

		console.log('*** Minimizing Build');

		// Here we will manually decide the order of our javascript files, 
		// to maintain Angular Dependencies
		return gulp.src([
				globals.script_dir+'**/*.js'
			])
			.pipe(order([
				'views.js',
				'app.js',
				'*.controller.js',
				'*.directive.js',
				'routes.js',
				'config.js',
				'services/service.js'
			]))
			.pipe(debug())
			.pipe(concat('angular.js'))
			.pipe(gulp.dest(globals.temp_dir));
	});

	gulp.task('uglify-scripts',['concat-angular'],function(){
		console.log("====== >");
    	console.log('Minimized File Directory = ',globals.script_dist_dir);
    	console.log("====== >");

    	// Adding Bower before our scrips
		return gulp.src(globals.temp_dir+'/*.js')
				.pipe(order([
					'bower.js',
					'angular.js',
				]))
				.pipe(debug())
				.pipe(concat('app.js'))
				.pipe(gulp.dest(globals.script_dist_dir))
	});

};

module.exports = tasks;
