/***************************
****test classe planning****
****************************/


QUnit.test( "testPlanningGetMode", function( assert ) {
	var planningTest = new Planning("journalier");
	assert.equal(  planningTest.getMode(), "journalier", "Passed!" );
});

QUnit.test( "testPlanningSetMode", function( assert ) {
	var planningTest = new Planning("journalier");
	planningTest.setMode("hebdomadaire");
	assert.equal(  planningTest.getMode(), "hebdomadaire", "Passed!" );
});

QUnit.test( "testPlanningGetColonneHoraire", function( assert ) {
	var planningTest = new Planning("journalier");
	assert.equal(  planningTest.getColonneHoraire().getLargeur(), 16.66, "Passed!" );
});

QUnit.test( "testPlanningSetColonneHoraire", function( assert ) {
	var planningTest = new Planning("journalier");
	var colonneHoraire = new ElementGraphique(20);
	planningTest.setColonneHoraire(colonneHoraire);
	assert.equal(  planningTest.getColonneHoraire().getLargeur(), 20, "Passed!" );
});

QUnit.test( "testPlanningAddPages", function( assert ) {
	var planningTest = new Planning("journalier");
	var pageTest = new Page();
	planningTest.addPage(pageTest);
	assert.equal(  planningTest.getPages().size(), 1, "Passed!" );
});

QUnit.test( "testPlanningOptimerLargeurColonne", function( assert ) {
	var planningTest = new Planning("journalier");
	var colonneTest = new Colonne("salle Rubis",10);
	planningTest.ajoutColonne(colonneTest);
	planningTest.optimiserLargeurColonnes();
	assert.equal( planningTest.getColonnes()[0].getLargeur(), 83.34, "Passed!" );
});

QUnit.test( "testPlanningGetPage", function( assert ) {
	var planningTest = new Planning("journalier");
	var pageTestNumeroUn = new Page();
	var pageTestNumeroDeux = new Page();
	var colonneTest = new Colonne();
	planningTest.addPage(pageTestNumeroUn);
	planningTest.addPage(pageTestNumeroDeux);
	pageTestNumeroDeux.ajoutColonne(colonneTest);
	
	assert.equal(  planningTest.getPage(0),pageTestNumeroUn, "Passed!" );
	assert.equal(  planningTest.getPage(1), pageTestNumeroDeux, "Passed!" );
});

QUnit.test( "testPlanningAjoutColonne", function( assert ) {
	var planningTest = new Planning("journalier");
	
	var colonneTest = new Colonne("salle Rubis",10);
	
	planningTest.ajoutColonne(colonneTest);
	
	assert.equal(  planningTest.getColonnes()[0].getTitre(), "salle Rubis"
	, "Passed!" );
	assert.equal(  planningTest.getColonnes()[0].getLargeur(), 16.66
	, "Passed!" );
	
});

QUnit.test( "testPlanningGetColonnes", function( assert ) {
	var planningTest = new Planning("journalier");
	var colonneTest = new Colonne("salle Rubis",10);
	planningTest.ajoutColonne(colonneTest);
	assert.equal(  planningTest.getColonnes(0).size(), 1, "Passed!" );
});

QUnit.test( "testPlanningRepartirColonnes", function( assert ) {
	var planningTest = new Planning("journalier");
	var pageTestNumeroUn = new Page();
	var pageTestNumeroDeux = new Page();
	var colonneTest = new Colonne();
	planningTest.addPage(pageTestNumeroUn);
	planningTest.addPage(pageTestNumeroDeux);
	pageTestNumeroDeux.ajoutColonne(colonneTest);
	planningTest.repartirColonnes();
	assert.equal(  planningTest.getPage(0).getColonnes().size(),1, "Passed!" );
	assert.equal(  planningTest.getPage(1), undefined, "Passed!" );
});

//supprimer colonne ne fonctionne plus pour l'instant
/*QUnit.test( "testPlanningSupprimerColonne", function( assert ) {
	var planningTest = new Planning("journalier");
	
	var colonneTest = new Colonne("salle Rubis",10);
	
	planningTest.ajoutColonne(colonneTest);
	planningTest.supprimerColonne(colonneTest);
	
	assert.equal(  planningTest.getColonnes()[0], undefined
	, "Passed!" );
	
});*/


QUnit.test( "testPlanningAjouterCategories", function( assert ) {

	var planningTest = new Planning("journalier");
	var categoriesTest = new Categorie("jaune","Informatique");
	
	planningTest.ajouterCategories(categoriesTest);

	var cat = planningTest.getCategories();
	assert.equal( cat.size(),1,"Passed!");
	
});

QUnit.test( "testPlanningSupprimerCategories", function( assert ) {
	var planningTest = new Planning("journalier");
	var categoriesTest = new Categorie("jaune","Informatique");
	
	planningTest.ajouterCategories(categoriesTest);
	planningTest.supprimerCategorie();
	var cat = planningTest.getCategories();
	
	assert.equal( cat.size(),0,"Passed!");
	
});

/*QUnit.test( "testPlanningEstCategoriesExistante", function( assert ) {
	var planningTest = new Planning("journalier");
	var categoriesTestExistante = new Categorie("jaune","Informatique");
	var categoriesTestNonExistante = new Categorie("rouge","Pause");
	
	planningTest.ajouterCategories(categoriesTestExistante);
	
	assert.equal( planningTest.estCategorieExistante(categoriesTestExistante),true,"Passed!");
	assert.equal( planningTest.estCategorieExistante(categoriesTestNonExistante),false,"Passed!");
	
});*/

QUnit.test( "testPlanningReinitialiserJournalier", function( assert ) {
	var planningTest = new Planning("journalier");
	
	var colonneTest = new Colonne("salle Rubis",10);
	
	planningTest.ajoutColonne(colonneTest);
	planningTest.ajoutColonne(colonneTest);
	planningTest.reinitialiser();
	
	assert.equal(planningTest.getColonnes()[0],undefined , "Passed!");
	
});

QUnit.test( "testReinitialiserHebdo", function( assert ) {
	var planningTest = new Planning("hebdomadaire");
	var periodeTest = new Periode({heureDeb:8});
	var colonneTest = new Colonne("Lundi",10);
	var evenementTest = new EvenementClassique("TD","UML",periodeTest,1,"conception informatique");
	
	planningTest.ajoutColonne(colonneTest);
	colonneTest.ajouterEvenement(evenementTest);
	planningTest.reinitialiser();
	
	assert.equal(planningTest.getColonnes()[0].getTaches()[0],undefined , "Passed!");
	
});