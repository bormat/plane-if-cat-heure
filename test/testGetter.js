/*****************************
****test classe evenement*****
******************************/
QUnit.test( "testGetterSetterSimple", function( assert ) {
	var classee = Class.create({})
	var instance= new classee({});
	addGSet(classee,["a","b"]);
	instance.setA(5);
	instance.setB(8);
	assert.equal(  instance.getA(), 5, "Passed!" );
	assert.equal(  instance.getB(), 8, "Passed!" );
});

QUnit.test( "testGetterSetterLier", function( assert ) {
	var classee = Class.create({})
	var instance= new classee({});
	addGSet(classee,["a","b"]);
	instance.setA(5).setB(8);;
	assert.equal(  instance.getA(), 5, "Passed!" );
	assert.equal(  instance.getB(), 8, "Passed!" );
});

QUnit.test( "testGetterOnly", function( assert ) {
	var classee = Class.create({
		initialize:function (a,b){
			this._a=2;
			this._b=5;
		}
	})
	var instance= new classee();
	addGSet(classee,["a","b"],"get");
	assert.equal(  instance.getA(), 2, "Passed!" );
	assert.equal(  !instance.getA(), false, "Passed!" );
	assert.equal(  !instance.set, true, "Passed!" );
	assert.equal(  !instance.setB, true, "Passed!" );
	assert.equal(  !instance.setA, true, "Passed!" );
})

QUnit.test( "testGetterOnly", function( assert ) {
	var classee = Class.create({
		getTheA:function (a){
			return this._a;
		}
	})
	var instance= new classee();
	addGSet(classee,["a"],"set");
	instance.setA(8)
	assert.equal(  !instance.getA, true, "Passed!" );
	assert.equal(  instance.getTheA(), 8, "Passed!" );
})

QUnit.test( "testGetterDetableau", function( assert ) {
	var classee = Class.create({
		initialize:function (a,b){
			this._as=[1,2,3,4];
		}
	})
	var instance= new classee();
	addGetterDetableau(classee,["a"]);
	assert.equal( instance.getA(2), 3, "Passed!" );
	assert.equal(  instance.getAs()[3], instance.getA(3), "Passed!" );
	instance.ajtA(5);
	assert.equal(  instance.getA(4), 5, "Passed!" );
	assert.equal(  instance.getAs().length, 5, "Passed!" );
	instance.supA(3);
	assert.equal(  instance.getAs().length, 4, "Passed!" );
	assert.equal(  instance.getA(2), 4, "Passed!" );	
})

