'use strict'

const globals = require('./globals.js');

const jslint = require('gulp-jslint');
const htmllint = require('gulp-htmllint');

const tasks = function(gulp,plugins,path){
  gulp.task('js-lint',function(){
    return gulp.src('./app/**/*.js')
      .pipe(jslint())
      .pipe(jslint.reporter( 'default' ));
  });

  gulp.task('html-lint',function(){
    return gulp.src('./views/**/*.html')
      .pipe(htmllint(), htmllintReporter);
  });

  gulp.task('lint-scripts',['js-lint','html-lint']);
};

function htmllintReporter(filepath, issues) {
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            gutil.log(gutil.colors.cyan('[gulp-htmllint] ') + gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + gutil.colors.red('(' + issue.code + ') ' + issue.msg));
        });
 
        process.exitCode = 1;
    }
}

module.exports = tasks;
