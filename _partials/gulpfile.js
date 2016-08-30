'use strict'

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const globals = require('./gulp/globals');

const inject = require('./gulp/gulp_inject')(gulp);
const sass = require('./gulp/gulp_sass')(gulp);
const lint = require('./gulp/gulp_lint')(gulp);
const minimize = require('./gulp/gulp_uglify')(gulp);

function watchFiles(){
	gulp.watch(globals.scss_dir+'/**/*.scss',['compile-styles']).on('change',browserSync.reload);
	gulp.watch(globals.views_dir+'/**/*.html',['inject-partials']).on('change',browserSync.reload);
	gulp.watch(globals.script_dir+'/**/*.js',['uglify-scripts']).on('change',browserSync.reload);
}

gulp.task('browser-sync',function(){
	browserSync.init({
		injectChanges:true,
		server:globals.dist_dir
	});
});

gulp.task('pre-compile',['compile-styles','inject-partials']);
gulp.task('build',['pre-compile','uglify-scripts']);

gulp.task('watch',['browser-sync','build'],watchFiles);
gulp.task('lint',['lint-scripts']);
gulp.task('default',['watch']);
