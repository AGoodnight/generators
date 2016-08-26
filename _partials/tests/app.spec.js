// Your general Application tests go here
// Tests are executed via Flask

describe("Main Module",function(){

	var controller, scope;

	beforeEach(inject(function($controller,$rootScope){
		scope = $rootScope.$new();
		controller = $controller('appController',{
			$scope:scope
		});

		describe('App Controllers scope',function(){
			it('has a name on scope',function(){
				expect(scope).toBeDefined();
				expect(scope.name).toEqual('appController');
			});
		});
	}));

	it("Should have an instance of AppController",function(){
		beforeEach(angular.mock.module('MainModule'));
		expect(App.AppController).toBeDefined();
	});

	it("Should have an instance of UI-Router", inject['$state'], function(stateService){
		expect(stateService).toBeDefined()
	});
	
});