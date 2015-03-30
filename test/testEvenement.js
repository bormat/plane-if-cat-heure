/*****************************
****test classe evenement*****
******************************/
/*QUnit.test( "testEvenementGetId", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	Evenement.setLastID(0);
	var evenementTest = new Evenement(periodeTest,1,true);
	assert.equal(  evenementTest.getId(), 0, "Passed!" );
});*/
/*
QUnit.test( "testEvenementSetId", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evenementTest = new Evenement(periodeTest,1,true);
	evenementTest.setId(2); 
	assert.equal(  evenementTest.getId(), 2, "Passed!" );
});*/

QUnit.test( "testEvenementGetNom", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evenementTest = new EvenementClassique("TP","refactoring",periodeTest,1,"Informatique");
//	evenementTest.setId(2); 
	assert.equal(  evenementTest.getNom(), "TP", "Passed!" );
});

QUnit.test( "testEvenementSetNom", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evenementTest = new EvenementClassique("TP","refactoring",periodeTest,1,"Informatique");
	 evenementTest.setNom("TD"); 
	assert.equal(  evenementTest.getNom(), "TD", "Passed!" );
});

//comparer heureDeb et getIntervalle
QUnit.test( "testEvenementGetPeriode", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
//	Evenement.setLastID(0);
	var evenementTest = new EvenementClassique("TP","refactoring",periodeTest,1,"Informatique");

	assert.equal(  evenementTest.getPeriode().getHeureDebut(), 8, "Passed!" );
	assert.equal(  evenementTest.getPeriode().getIntervalle(), 60, "Passed!" );
});

QUnit.test( "testEvenementSetPeriode", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var periodeSet = new Periode({heureDeb:7,
		minuteDeb : 45,
		heureFin : 8,
		minuteFin: 45});
//	Evenement.setLastID(0);
	var evenementTest = new Evenement("TP",periodeTest,"refactoring","salle Rubis");
	evenementTest.setPeriode(periodeSet);
	
	assert.equal(  evenementTest.getPeriode().getHeureDebut(), 7, "Passed!" );
	assert.equal(  evenementTest.getPeriode().getIntervalle(), 60, "Passed!" );
});



QUnit.test( "testEvenementGetCategorie", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	//	Evenement.setLastID(0);
	var evenementTest = new EvenementClassique("TP","refactoring",periodeTest,"Informatique");
	assert.equal(  evenementTest.getCategorie(), "Informatique", "Passed!" );
});

QUnit.test( "testEvenementSetCategorie", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	//Evenement.setLastID(0);
	var evenementTest = new EvenementClassique("TP","refactoring",periodeTest,"Informatique");
	evenementTest.setCategorie("Qualite"); 
	assert.equal(  evenementTest.getCategorie(), "Qualite", "Passed!" );
});
/*
QUnit.test( "testEvenementIncrementationId", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
//	Evenement.setLastID(0);
	var evenementTest = new Evenement("TP1",periodeTest,"refactoring","salle Rubis");
	var evenementTest = new Evenement("TP2",periodeTest,"refactoring","salle Rubis");
	var evenementTest = new Evenement("TP3",periodeTest,"refactoring","salle Rubis");
	//assert.equal(evenementTest.getId(), 2, "Passed!" );
});*/

QUnit.test( "testEvenementgetNbCol", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evmt=new EvenementClassique("TP","refactoring",periodeTest,"Informatique",5);
	assert.equal(evmt.getNbCol(),5,"Passed");
});

QUnit.test( "testEvenementSetNbCol", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evmt=new EvenementClassique("TP",periodeTest,"refactoring","salle Rubis",2);
	evmt.setNbCol(5);
	assert.equal(evmt.getNbCol(),5,"Passed");
});

QUnit.test( "testEvenementGetVisibility", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evmt=new EvenementClassique("TP","refactoring",periodeTest,"Informatique");
	
	assert.equal(evmt.getVisibility(),true,"Passed");
});

QUnit.test( "testEvenementGetColonne", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evmt=new EvenementClassique("TP","refactoring",periodeTest,"Informatique");
	var col = new Colonne("blabla");
	col.ajouterEvenement(evmt);
	
	assert.equal(evmt.getColonne(),col,"Passed");
});