const lint_js = require('gulp-jslint');
const lint_html = require('gulp-htmllint');

'use strict'

const tasks = function(gulp,plugins,path){
  gulp.task('lint-scripts',function(){
    console.log('*** Linting Scripts');
  })
};

module.exports = tasks;
