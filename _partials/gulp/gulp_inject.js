const globals = require('./gulp/globals.js');

const lint = require('gulp-inject-partials');

'use strict'

const tasks = function(gulp,plugins,path){
  gulp.task('inject-partials',function(){
    return gulp.src(globals.index)
           .pipe(injectPartials({
              removeTags: true
           }))
           .pipe(gulp.dest(gl
           	obals.src));
  })
};

module.exports = tasks;
