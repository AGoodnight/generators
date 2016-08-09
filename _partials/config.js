(function(){

	// This script should be where you configure you primary app module.
	// A run command may also be placed here.

	angular.module('MainModule').config(Routes()); // Providing our routes as a returned object is cleaner.
	angular.module('MainModule')
		.config(function(){
			// Additonal Configuration
		})
		.run(function(){
			// On run do something
		});

	console.log('---> App Configured');

})();