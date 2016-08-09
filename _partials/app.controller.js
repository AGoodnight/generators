// We can isolate all of this because Angular internalizes everything once it registers a componenet
(function(){
	
	angular.module('MainModule').controller('AppController',_controller);
	_controller.$inject = ['data'];
	
	function _controller(data){
		var vm = this;
		console.log('I am the praimry controller and I see: ', Views().layout, ' & ',data );
	};

	console.log("---> AppController Defined")
	console.log(Views())

})();