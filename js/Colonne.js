/***************************
***** Classe colonne ******
****************************/

Class.create("Colonne",{
	initialize: function(titre,largeur){
		this._taches=new Tab(),
		this._titre=titre,
		this._largeur=16.66
	},
	undo: function(){
		this.getPage().getPlanning().ajoutColonne(this)
	},
	ajouterEvenement:function(evmt){
		this._taches.push(evmt);
		evmt.setColonne(this);
	},
	supprimerEvenement:function(evmt){
		this._taches.suppElmt(evmt);
	},
	reinitialiserEvenement:function(){
		this._taches=new Tab();
	},
	setLargeurPx: function(largeurCol,largeurPlanning){
		var max=this.getPage().getPlanning().getLargeurMax();
		this._largeur = 100*largeurCol / largeurPlanning;
		if ( this._largeur > max ){
			this._largeur=max;
		}		
	},
	getLargeurPrcnt: function(largeur){
		return this._largeur + "%";
	},
	multLargeurPar:function(coef){
		this._largeur *= coef;
	},
	getteurEtSetteur:"taches,titre,page,colonne",
	getteur:"largeur"
})

