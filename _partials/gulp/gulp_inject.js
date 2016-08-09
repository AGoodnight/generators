'use strict'

const globals = require('./globals.js');

const injectPartials = require('gulp-inject-partials');

const tasks = function(gulp,plugins,path){
  gulp.task('inject-partials',['copy-views'],function(){
    return gulp.src(globals.index)
           .pipe(injectPartials({
              removeTags: true
           }))
           .pipe(gulp.dest(globals.dist_dir)); // places in the webapp directory
  });

  gulp.task('copy-views',function(){
    return gulp.src(globals.views_dir+'/*.html')
          .pipe(gulp.dest(globals.dist_dir+'/views'));
  });
};

module.exports = tasks;
