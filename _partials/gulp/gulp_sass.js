'use strict'

const globals = require('./globals.js');

const sass = require('gulp-sass');

const tasks = function(gulp,plugins,path){
  gulp.task('compile-sass',function(){
    gulp.src('./scss/*/**.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest(globals.dist_dir+'/css'))
  })
};

module.exports = tasks;
