/***************************
****test serial planning****
****************************/


QUnit.test( "testCyclicObjet", function( assert ) {
	var cont = controlleur();
	assert.equal(  cont.grillePlanning.isAfficher(), false );
	assert.equal(  cont.accueilVisible.isAfficher(), true );
	//à vous les tests de controleur

});