'use scrict';
Array.prototype.suppElmt=function(elmt){
  var indiceMonEvnmt = this.indexOf(elmt);
  this.splice(indiceMonEvnmt,1);
}
Object.defineProperty(Array.prototype, "suppElmt", {
  enumerable: false,
});

/***************************
***** Classe planning ******
****************************/
//Obligation de passer par un objet tab pour une serialisation plus simple,
//length ne se calcule plus tout seul une foix hérité de tableau il faut le reprogrammer
//notation en crochet pour l'ajout(push) prohibé car on ne peux recaculé length;
//reste possible les modification est accès en lecture via crochets
Class.create("Tab", {
	extend:Array,
	initialize : function(){
		this.length=0;
		Object.defineProperties(this, {
			"length": {
				enumerable: false
			},
		});
	},
	push : function(elem){
		this[this.length] = elem;
		this.length++;
		return this.length;
	},
	last:function(){
		return(this[this.length-1])
	},
	suppElmt: function(elmt){
		var indiceMonEvnmt = this.indexOf(elmt);
		return this.splice(indiceMonEvnmt,1);//don't care about length Array are dynamics
	}
})


for( var prop in Tab.prototype ){
	Object.defineProperty(Tab.prototype, ""+prop, {
		enumerable: false, //exlu des for in;
	});
}

for( var prop in Tab.prototype.__proto__ ){
	Object.defineProperty(Tab.prototype.__proto__, prop, {
		enumerable: false, //exlu des for in;
	});
}


Class.create("Planning", {
	
	//constructeur
	initialize:function (mode){
		this._colonneHoraire=new ElementGraphique(16.66);
		this._colonneHoraire.setPlanning(this);
		this._mode=mode,
		this._categories = new Tab();
		this._page = new Tab();
		this._largeurMax=100;
		this._hauteurLigne1=50;
	},
	getNbCelluleHauteur: function(){
		return this.getHoraire().getHeureFin() - this.getHoraire().getHeureDebut() + 1;
	},
	//ni px ni % c'est une formule à utiliser pour la propriété calc de css 
	getHauteurCell:function(){
		return "( 100% - "+this.getHauteurLigne1()+"px ) * 60 / "+this.getHoraire().getIntervalle(); 
	},
	addPage:function(unePage){
		unePage= unePage || new Page();
		unePage.setPlanning(this);
		this._page.push(unePage);
		return unePage;
	},
	optimiserLargeurColonnes:function(){
		var self=this;
		this._page.forEach(function (p){
			var a = (100 - self._colonneHoraire.getLargeur());
			var b =(p.getLargeur() - self._colonneHoraire.getLargeur());
			var coef=a/b;
			p.getColonnes().forEach(function(col){
				col.multLargeurPar(coef);
			})
		})
	},	
	getPage:function(num){
		return this._page[num];
	},
	getTabPage:function(){
		return this._page;
	},
	getColonnes:function(num){
		var tab=new Tab();
		for (var i =0; i < this._page.length; i++){
			var listeCol = this._page[i].getColonnes()
			for (var j in listeCol){
				tab.push(listeCol[j])
			}
		}
		return tab;
	},	
	getPages:function(num){
		return this._page;
	},
	
	repartirColonnes:function(colonnes){
		var colonnes = colonnes || this.getColonnes();
		var largeur=this._colonneHoraire.getLargeur();
		var indicePage=0;
		this._page[0].setColonnes(new Tab());
		for (var i=0; i<colonnes.length; i++){
			var col=colonnes[i];
			largeur+=col.getLargeur();
			if (largeur < this._largeurMax){
				this._page[indicePage].ajoutColonne(col);
			}else{
				indicePage++;
				try{
					this._page[indicePage].setColonnes(new Tab());
				}catch(e){
					this.addPage();
				}
				largeur=col.getLargeur()+this._colonneHoraire.getLargeur();
        this._page[indicePage].ajoutColonne(col);
			}
      
      //supprimer les page en trop
      this._page.splice(indicePage+1,this._page.length);
		}
	},
	
	ajoutColonne:function(col){
		var page=this._page[this._page.length-1];
		if (!page || page.getLargeur() > this._largeurMax  ){
			page=this.addPage();
		}
		page.ajoutColonne(col);		
	},
	supprimerColonne:function(col){
		var cols=this.getColonnes();
		cols.suppElmt(col);
		this.repartirColonnes(cols);
	},
	ajouterCategories:function(couleur,categorieNom){
		this._categories.push(new Categorie(couleur,categorieNom));
		return this._categories.last();
	},
	supprimerCategorie:function(categorie){
      this._categories.suppElmt(categorie);
	},
	estCategorieExistante:function(categorie){
		var res = null;
		this._categories.forEach (function(cat) {
			if (cat.getNom() == categorie.getNom() && cat.getCouleur() == categorie.getCouleur()) {
				res = cat;
			}
		})
		return res;
	},
	testDepassementNombreColonnes:function(colonne, nbColonnes){
		var colonnes = colonne.getPage().getColonnes();
		var index = colonnes.indexOf(colonne);
		return (index+nbColonnes > colonnes.length);		
	},
  reinitialiser:function(){
    var col=this.getColonnes();
		if(this._mode=="journalier"){
      this._page=[new Page()];
    }else{	
			col.forEach(function(colonne){
				colonne.reinitialiserEvenement();
			})					
		}
	}
})
addGSet(Planning,["mode","categories","largeurMax","colonneHoraire","horaire","hauteurLigne1"]);
