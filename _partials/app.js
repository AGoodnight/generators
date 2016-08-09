(function(){

	// This script should be minimal and only be concered with establishing an app's name and it's dependencies.
	
	angular.module('MainModule',[
		'ui.router',
		'ngResource',
		'ngAria',
		'ui.bootstrap',
		'nvd3'
	]);

	console.log('---> App Defined');

})();