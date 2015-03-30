'use scrict';
/***************************
***** Classe planning ******
****************************/

Class.create("Page",{

	//constructeur
	initialize:function (){
		//attribut protected
		this._colonnes = new Tab();
	},
	//ne pas utiliser
	ajoutColonne:function(col2){
		this._colonnes.push(col2);
		col2.setPage(this);
	},
	
	supprimerColonne:function(col){
		this._colonnes.suppElmt(col);
	},
	
	reinitialiser:function(){
		if(this._mode=="journalier"){
			this._colonnes=new Tab();
		}else{	
			this._colonnes.forEach(function(colonne){
				colonne.reinitialiserEvenement();
			})					
		}
	},
	getLargeur:function(){
		var largeur=0;
		this._colonnes.forEach( function(col){
			largeur+=col.getLargeur();
		})
		var plan=this.getPlanning();
		if (plan){
			largeur+=plan.getColonneHoraire().getLargeur();
		}
		return largeur;
	}
	
})
addGSet(Page,["mode","planning","colonnes","categories"])
