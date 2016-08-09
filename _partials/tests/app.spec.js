// Your general Application tests go here
// Tests are executed via Flask

describe("Main Module",function(){

	it("Should have an instance of AppController",function(){
		beforeEach(angular.mock.module('MainModule'));
		expect(App.AppController).toBeDefined();
	});

	it("Should have an instance of UI-Router", inject['$state'], function(stateService){
		expect(stateService).toBeDefined()
	});
	
});