// Your general Application tests go here
// Tests are executed via Flask

describe("Main Module",function(){

	var controller, scope, element;

	beforeEach(angular.mock.module('MainModule'));

	beforeEach(inject(function($compile, _$httpBackend_,$controller,$rootScope){
		$httpBackend = _$httpBackend_;  
		scope = $rootScope.$new();
        scope.buttonRating = 'green'; //<-- Here
        //set our view html.
        element = angular.element('<rating-button button-rating="buttonRating"></rating-button>');
        $compile(element)(scope);
        scope.$digest();

	}));

	it("It should have stuff in it's isolated scope",function(){
		expect(element.isolateScope().buttonRating).toBe('green');
        expect(element.isolateScope().getRatingClass()).toBe('btn-success');
    });
	
});