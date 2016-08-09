var Routes = function(){
	
	_config.$inject =['$stateProvider','$urlRouterProvider'];
	return _config;

	function _config($stateProvider, $urlRouterProvider){

		$stateProvider.state('home',{
			url:'',
			templateUrl:Views().layout,
			controller:'AppController',
			controllerAs:'vm',
			resolve:{
				data:function(){
					return {
						apiEndpoint: 'api/example_endpoint'
					}
				}
			}
		});

		console.log('---> Routes Configured');
	};
};