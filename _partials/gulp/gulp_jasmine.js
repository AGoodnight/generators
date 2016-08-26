const globals = require('./globals.js');
const gulp = require('gulp');
const karma = require('gulp-karma-runner');
const jasmine = require('karma-jasmine');
const karmaPlugins = [
  "karma-jasmine"
];

const tasks = function(gulp,plugins,path){

	gulp.task('unit-testing',function(){
		console.log('******* UNIT TESTS START')
		return gulp.src(globals.test_dir+'/*.js')
			.pipe(karma.server({
				"configFile":"./karma.config.js",
                "singleRun": true,
                "plugins": [
		            'karma-jasmine'
	            ],
            })
        );
	});

	gulp.task('run-jasmine',['unit-testing'],function(){
		console.log('******* UNIT TESTS END')
	});

};

module.exports = tasks;