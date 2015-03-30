/***************************
****test classe colonne*****
****************************/

QUnit.test( "testColonneGetTitre", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	assert.equal(  colonneTest.getTitre() , "salle Rubis", "Passed!" );
});

QUnit.test( "testColonneSetTitre", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	colonneTest.setTitre("salle Opale");
	assert.equal(  colonneTest.getTitre() , "salle Opale", "Passed!" );
});

QUnit.test( "testColonneGetLargeur", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	assert.equal(  colonneTest.getLargeur() , 16.66, "Passed!" );
});



QUnit.test( "testColonneSetTaches", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	var periodeTest = new Periode({heureDeb:8});
	var evenementTest = new EvenementClassique("TD","UML",periodeTest,"conception informatique",1);
	colonneTest.ajouterEvenement(evenementTest);
	var tabEvmt = new Array(evenementTest);
	colonneTest.setTaches(tabEvmt);
	assert.equal(  colonneTest.getTaches()[0].getNom() , "TD", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getPeriode().getHeureDebut() , 8, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getDescription() , "UML", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getNbCol() , 1, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getCategorie() , "conception informatique", "Passed!" );
});

QUnit.test( "testColonneajouterEvenement", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	var periodeTest = new Periode({heureDeb:8});
	var evmt=new EvenementClassique("TP","refactoring",periodeTest,"Informatique",3);
	colonneTest.ajouterEvenement(evmt);
	assert.equal( colonneTest.getTaches()[0].getNom(), "TP", "Passed!" );
	assert.equal( colonneTest.getTaches()[0].getPeriode().getHeureDebut(),8 , "Passed!" );
	assert.equal( colonneTest.getTaches()[0].getDescription(), "refactoring", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getNbCol() , 3, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getCategorie() , "Informatique", "Passed!" );
});

QUnit.test( "testColonneSupprimerEvenement", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	var evenementTest= new Evenement();
	var periodeTest = new Periode({heureDeb:8});
	var evmt=new EvenementClassique("TP","refactoring",periodeTest,"Informatique",1);
	colonneTest.ajouterEvenement(evmt);
	colonneTest.ajouterEvenement(evmt);

	colonneTest.supprimerEvenement(colonneTest.getTaches()[1]);
	assert.equal(  colonneTest.getTaches()[0].getNom(), "TP", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getPeriode().getHeureDebut(),8 , "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getDescription(), "refactoring", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getNbCol() , 1, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getCategorie() , "Informatique", "Passed!" );
	assert.equal(  colonneTest.getTaches()[1], undefined, "Passed!" );
});

QUnit.test( "testtColonneReinitialiserEvenement", function( assert ) {
	var colonneTest = new Colonne("colonne1", 150);
	var periodeTest = new Periode({heureDeb:8});
	var evenementTest = new EvenementClassique("TP","refactoring",periodeTest,"Informatique",1);
	
	colonneTest.reinitialiserEvenement();
	assert.equal(colonneTest.getTaches()[0], undefined, "Passed!" );
});

QUnit.test( "testColonneSetLargeurPx", function( assert ) {
	var colonneTest = new Colonne("colonne1", 150);
	colonneTest.setPage(new Page().setPlanning(new Planning()));
	colonneTest.setLargeurPx(10,10);
	assert.equal(colonneTest.getLargeur(),100, "Passed!" );
});

QUnit.test( "testColonneSetLargeurPxMax", function( assert ) {
	var colonneTest = new Colonne("colonne1", 150);
	colonneTest.setPage(new Page().setPlanning(new Planning()));
	colonneTest.setLargeurPx(20,10);
	assert.equal(colonneTest.getLargeur(),100, "Passed!" );
});

QUnit.test( "testColonneGetLargeurPrcnt", function( assert ) {
	var colonneTest = new Colonne("colonne1");
	assert.equal(colonneTest.getLargeurPrcnt(),'16.66%', "Passed!" );
});

QUnit.test( "testColonneMultLargeurPar", function( assert ) {
	var colonneTest = new Colonne("colonne1");
	colonneTest.multLargeurPar(2);
	assert.equal(colonneTest.getLargeur(),33.32, "Passed!" );
});