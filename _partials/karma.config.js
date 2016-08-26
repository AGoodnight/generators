// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],
    files:[
	    { pattern: 'bower_components/angular/angular.js'},
    	{ pattern: 'bower_components/angular-mocks/angular-mocks.js'},
	    { pattern: 'webapp/script/app.js'},
	    'test/*.spec.js'
    ]
  });
};