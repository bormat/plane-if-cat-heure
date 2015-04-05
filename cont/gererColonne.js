var gestionColonne=function($){
	$.$=$;
	$.afficherModifierColonne = function() {
		$.$.formCol.titre = "";
		$.fenetreAjoutColonne.afficher(true);
	}	
	$.ajoutColonne = function() {
		if(!$.formCol.titre){
			alert('Veuillez saisir un titre valide.');
		}else{
			$.planning.ajoutColonne(new Colonne($.formCol.titre));
			$.planning.repartirColonnes();
			$.fenetreAjoutColonne.afficher(false);
		}
	}	
	$.afficherModifColonne=function(colo){
		$.formCol.titre = colo.getTitre();
		$.fenetreModifSupprColonne.afficher(true);
		$.formCol.col=colo;			
	}	
	$.modifColonne=function(){
		if (!$.formCol.titre) {
			alert('Veuillez saisir un titre valide.');
		}else{
			$.formCol.col.setTitre($.formCol.titre);
			$.fenetreModifSupprColonne.afficher(false);
		}
	}	
	$.supprColonne=function(){
		$.poubelle.push($.formCol.col);
		$.planning.supprimerColonne($.formCol.col);
		$.fenetreModifSupprColonne.afficher(false);
	}	
	$.colonneRedim=function(col){
		var largeurElm = $.accessToResizableElmt.offsetWidth;
		var largeurPlanning=$$(".A4")[0].offsetWidth;
		/*debut suppression de bug*/
		col.setLargeurPx(largeurElm+1, largeurPlanning); 
		$.$apply();
		/*fin suppression de bug*/
		col.setLargeurPx(largeurElm, largeurPlanning)
		$.planning.repartirColonnes();
	}
	$.modifHeure = function(){
		if ($.horaire.heureDeb >= $.horaire.heureFin){
			alert('Veuillez saisir un créneau horaire valide.');
		}else{
			$.planning.getHoraire().initialize($.horaire);
			$.ligne = [];
			for (var h = $.horaire.heureDeb ; h < $.horaire.heureFin; h++){
			  $.ligne.push(h);
			}
			$.fenetreModifHoraire.afficher(false);
		}
	}
}