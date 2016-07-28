const lint = require('gulp-inject-partials');

'use strict'

const tasks = function(gulp,plugins,path){
  gulp.task('inject-partials',function(){
    console.log('*** Injecting Partials');
  })
};

module.exports = tasks;
