const sass = require('gulp-sass');

'use strict'

const tasks = function(gulp,plugins,path){
  gulp.task('compile-sass',function(){
    gulp.src('./sass/*/**.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('./css'));
  })
};

module.exports = tasks;
