/***************************
***** Classe colonne ******
****************************/

Class.create("ElementGraphique",{
	initialize: function(largeur){
		this._largeur=largeur;
	},
	setLargeurPx: function(largeurCol,largeurPlanning){
		var max=this.getPlanning().getLargeurMax();
		this._largeur = 100*largeurCol / largeurPlanning;
		if ( this._largeur > max ){
			this._largeur=max;
		}		
	},
	getLargeurPrcnt: function(largeur){
		return this._largeur + "%";
	}
})
addGSet(ElementGraphique,['planning','largeur']);
