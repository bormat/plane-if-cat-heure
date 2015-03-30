/***************************
****test classe periode*****
****************************/

QUnit.test( "testPeriodeGetMinuteDebut", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	
	assert.equal(periodeTest.getMinuteDebut(), 30, "Passed!" );
});


QUnit.test( "testPeriodeGetIntervalle", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	
	assert.equal(  periodeTest.getIntervalle(), 60, "Passed!" );
});

QUnit.test( "testPeriodeGetHeureDebut", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30});
		
	assert.equal(  periodeTest.getHeureDebut() , 8, "Passed!" );
});


QUnit.test( "testPeriodeGetEnMinDebut", function( assert ) {
	var periodeTest = new Periode({heureDeb:20,minuteDeb:30});
		
	assert.equal(  periodeTest.getEnMinDebut(), 1230, "Passed!" );
});

QUnit.test( "testPeriodeGetHeureFin", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
		
	assert.equal(  periodeTest.getHeureFin(), 9, "Passed!" );
});

QUnit.test( "testPeriodeGetMinuteFin", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 45});
		
	assert.equal(  periodeTest.getMinuteFin(), 45, "Passed!" );
});

QUnit.test( "testPeriodeDecalerA", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 45});
		
	periodeTest.decallerA({heure:9});	
	assert.equal(periodeTest.getHeureDebut(), 9, "Passed!" );
	assert.equal(periodeTest.getHeureFin(), 10, "Passed!" );
});