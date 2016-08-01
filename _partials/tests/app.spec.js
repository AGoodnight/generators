// Your general Application tests go here
// Tests are executed via Flask

describe("An App",function(){
	var a;
	it("should be running this",function(){
		a = true;
		expect(a).toBe(true);
	});
});