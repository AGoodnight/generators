'use strict'

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const globals = require('./gulp/globals');

const inject = require('./gulp/gulp_inject')(gulp);
const sass = require('./gulp/gulp_sass')(gulp);
const lint = require('./gulp/gulp_lint')(gulp);
const minimize = require('./gulp/gulp_uglify')(gulp);
const tests = require('./gulp/gulp_jasmine')(gulp);

gulp.task('sync',function(){
	browserSync.init({
		server:globals.dist_dir
	});
});

// Sequencing
gulp.task('pre-compile',['compile-styles','inject-partials']);
gulp.task('compile',['sync','pre-compile','uglify-scripts']);

// If SCSS changes, update css
gulp.task('watch-scss',function(){
	gulp.watch(globals.scss_dir+'/**/*.scss',['compile-sass'],function(cb){
		/*browserSync.reload();
		done();*/
	});
});

// If HTML changes, rebuild
gulp.task('watch-html',function(){
	gulp.watch(globals.views_dir+'/**/*.html',['post-compile']);
});

// If JS changes, rebuild
gulp.task('watch-js',function(){
	gulp.watch(globals.script_dir+'/**/*.js',['post-compile']);
});

// Call these directly
gulp.task('build',['compile']);
gulp.task('watch',['watch-scss','watch-js','watch-html']);
gulp.task('lint',['lint-scripts']);
gulp.task('test',['run-jasmine']);
gulp.task('serve',['sync']);

gulp.task('default',['lint','build']);
