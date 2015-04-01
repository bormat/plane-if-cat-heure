
Class.create("Fenetre",{
	initialize:function(montrer){
		this._visible=montrer;
	},
	afficher:function (montrer){
		if (montrer === undefined) montrer = true;
		this._visible=montrer;
	},
	isAfficher:function (){
		return this._visible;
	},
	getNameToInclude : function(){
		return "html/"+ this._name +".html";
	},
	//if we want animation
	getClasse:function(){
		return (this._visible) ? "optionVisible" : "optionInvisible";
	}
})
addGSet(Fenetre,["name"])

