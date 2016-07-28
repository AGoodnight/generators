const uglify = require('gulp-uglify');

'use strict'

const tasks = function(gulp,plugins,path){
  gulp.task('minimize-build',function(){
    console.log('*** Minimizing Build');
  })
};

module.exports = tasks;
