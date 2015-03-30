
Class.create("Fenetre",{
	initialize:function(montrer){
		this._visible=montrer;
	},
	afficher:function (montrer){
		this._visible=montrer;
	},
	isAfficher:function (){
		return this._visible;
	}
})


Class.create("FenetreAvecTransition",{
	extend: Fenetre,
	getClasse:function(){
		return (this._visible) ? "optionVisible" : "optionInvisible";
	}
})

