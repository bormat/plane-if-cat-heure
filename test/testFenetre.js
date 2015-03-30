/*****************************
****test classe fenetre*****
******************************/
QUnit.test( "testFenetreIsAfficher", function( assert ) {
	var fenetreTest = new Fenetre(false);

	assert.equal(fenetreTest.isAfficher(), false, "Passed!" );
});

QUnit.test( "testFenetreAfficher", function( assert ) {
	var fenetreTest = new Fenetre(false);
	fenetreTest.afficher(true);
	assert.equal(fenetreTest.isAfficher(), true, "Passed!" );
});

QUnit.test( "testFenetreAvecTransitionTrue", function( assert ) {
	var fenetreTest = new FenetreAvecTransition();
	fenetreTest.afficher(true);
	assert.equal(fenetreTest.getClasse(), "optionVisible", "Passed!" );
});

QUnit.test( "testFenetreAvecTransitionFalse", function( assert ) {
	var fenetreTest = new FenetreAvecTransition();
	fenetreTest.afficher(false);
	assert.equal(fenetreTest.getClasse(), "optionInvisible", "Passed!" );
});