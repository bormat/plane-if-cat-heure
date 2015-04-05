function gererCategorie($){
	$.focusCouleur=function(categorie){
		$.formEvmt.categorie = categorie;
		$.titreCat.val = $.formEvmt.categorie.getNom();
	}	
	$.modifierCategorie=function(){
		var nom = $.formEvmt.categorie.getNom();
		var couleur = $.formEvmt.categorie.getCouleur();
		if(nom != $.titreCat.val) {
			if($.planning.estCategorieExistante(new Categorie(couleur,$.titreCat.val)) != null) {
				$.titreCat.val = nom;
				alert("Catégorie déjà existante");
			} else {
				var listeCategories = $.planning.getCategories();
				var res = new Categorie();
				var indice;
				listeCategories.forEach (function(cat) {
					if (cat.getNom() == nom && cat.getCouleur() == couleur) {
						indice = listeCategories.indexOf(cat);
						res.setNom($.titreCat.val);
						res.setCouleur(couleur);
						listeCategories[indice] = res;
					}
				})	
				$.planning.setCategories(listeCategories);
				$.formEvmt.categorie = res;
			}
		}
	}	
	$.supprimerCategorie=function(){
		var nom = $.formEvmt.categorie.getNom();
		var couleur = $.formEvmt.categorie.getCouleur();
		var catSup = $.planning.estCategorieExistante(new Categorie(couleur,nom));
		if (catSup != null) {
			$.planning.supprimerCategorie(catSup);
		}
		$.formEvmt.categorie = '';
		$.titreCat.val = '';
	}
	$.ajoutCategorie=function(){
		if($.planning.estCategorieExistante(new Categorie(couleurCat.val,$.titreCat.val)) != null) {
			alert("Catégorie déjà existante");
		} else {
			if ($.planning.getCategories().length >= 10) {
				alert("Vous ne pouvez ajouter que 10 catégories");
			} else {
				$.planning.ajouterCategories(couleurCat.val,$.titreCat.val);
				$.fenetreAjoutCategorie.afficher(false);
				$.titreCat.val ="";
				$.formEvmt.categorie="";
				$.fenCategorie.afficher(true);
			}
		}
	}
	
	$.afficherAjouterCategorie=function() {
		$.fenCategorie.afficher(false);
		$.fenetreAjoutCategorie.afficher(true);
		$.titreCat.val ="";
		$.couleurCat.val = "#000000";
	}
	
	$.afficherModifierCategorie=function() {
		$.fenCategorie.afficher(true);
		$.titreCat.val ="";
		$.couleurCat.val = $.planning.getCategories()[0].getCouleur();
	}
	
	$.retourModifierCategorie = function() {
		$.fenCategorie.afficher(true); 
		$.fenetreAjoutCategorie.afficher(false);
		$.formEvmt.categorie = '';
	}
	
	$.getCategoriesUtilises = function() {
		var resListeCat = [];
		var pages = $.planning.getTabPage();
		pages.forEach (function(page) {
			var colonnes = page.getColonnes();
			colonnes.forEach (function(colonne) {
				var taches = colonne.getTaches();
				taches.forEach (function(evnmt) {
					if(evnmt instanceof EvenementClassique) {
						var cat = evnmt.getCategorie();				
						if(resListeCat.indexOf(cat) == -1 && cat != $.planning._categories[0]){
							resListeCat.push(cat);
						}
					}
				});
			});
		});
		return resListeCat;
	}
}