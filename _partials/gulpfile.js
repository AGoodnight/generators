const gulp = require('gulp');

const globals = require('./gulp/globals.js');
const inject = require('./gulp/gulp_inject')(gulp);
const sass = require('./gulp/gulp_sass')(gulp);
const lint = require('./gulp/gulp_lint')(gulp);
const minimize = require('./gulp/gulp_uglify')(gulp);

gulp.task('pre-compile',['lint-scripts','compile-sass','inject-partials']);

gulp.task('compile',['pre-compile','minimize-build']);

gulp.task('post-compile',['compile']);

gulp.task('default',['post-compile']);

gulp.task('lint',['lint-scripts']);

//gulp.task('test',['jasmine']);
