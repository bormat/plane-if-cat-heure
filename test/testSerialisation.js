/***************************
****test serial planning****
****************************/


QUnit.test( "testCyclicObjet", function( assert ) {
	var a = {b:25,c:6};
	a.d=a;
	var b = serializeObjet(a);
	//assert.equal(  b, "{0:{b:25,c:6,d:'tab[0]'}}" );
	
	var retCaseDep = parseChaine(b)
	assert.equal(  retCaseDep.b, 25 );
	assert.equal(  retCaseDep.c, 6 );
	assert.equal(  retCaseDep.d.d.d.d.d.d.d.d.d, retCaseDep.d.d.d );
	assert.equal(  retCaseDep.d.d.d.d.d.d.d.d.d.c, 6 );
});
QUnit.test( "testPatternFactory", function( assert ) {
	var d={}
	var a = {b:25,c:6,enfant:d};
	d.papa=a;
	var b = serializeObjet(a);
//	assert.equal(  b, "{0:{b:25,c:6,enfant:'tab[1]'},1:{papa:'tab[0]'}}" );
	
	var retCaseDep = parseChaine(b)
	assert.equal(  retCaseDep.b, 25 );
	assert.equal(  retCaseDep.enfant.papa, retCaseDep );
});

QUnit.test( "testSerializeChaine", function( assert ) {
	var d={ chaine:"salut je suis une chaine"}
	var b = serializeObjet(d);
//	assert.equal(  b, "{0:{chaine:'salut je suis une chaine'}}" );
	
	var retCaseDep = parseChaine(b)
	assert.equal(  retCaseDep.chaine , "salut je suis une chaine" );
});

QUnit.test( "testGarderClass", function( assert ) {
	window["TheClass"] = function(){};
	window["TheClass"].prototype={};
	var d={ chaine:"salut je suis une chaine",serializationName:"TheClass"}
	var retCaseDep = parseChaine(serializeObjet(d))
	assert.equal(  retCaseDep instanceof window["TheClass"] , true);
})
//Attention un tableau devient un objet crée votre propre objet tableau pour serialisation
QUnit.test( "testSerializeTabCyclic", function( assert ) {
var e =[0,5,8];
var d={c:[1,2,3],f:e};
e[0]=d;
var retCaseDep = parseChaine(serializeObjet(d))
//assert.equal(  b, "{0:{c:'tab[1]',f:'tab[2]'},1:{0:1,1:2,2:3},2:{0:'tab[0]',1:5,2:8}}"  );
assert.equal(  retCaseDep.c[2], 3 );
});