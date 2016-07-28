const gulp = require('gulp');
const inject = require('./gulp/gulp_inject')(gulp);
const sass = require('./gulp/gulp_sass')(gulp);
const lint = require('./gulp/gulp_lint')(gulp);
const minimize = require('./gulp/gulp_uglify')(gulp);

gulp.task('_default',[
	'inject-partials',
	'lint-scripts',
	'minimize-build',
	'compile-sass'
]);

gulp.task('default',['_default']);
