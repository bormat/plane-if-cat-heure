		/*******************************/
		/********Afficher formulaire****/
		/*******************************/
function gererEvenmt($){
		$.validationFormulaireEvenement= function(){
			var evnmt = ($.mode =="ajout") ? new EvenementClassique() : $.form.evnmt ;
			if ($.planning.testDepassementNombreColonnes($.form.col, $.formEvmt.nbCol)) {
					alert("Impossible de modifier l'évènement : débordement de la page");
					return false;
			}
			evnmt.initialize($.formEvmt.titre, $.formEvmt.description, new Periode($.formEvmt), $.formEvmt.categorie, $.formEvmt.nbCol);
			if($.mode =="ajout"){
				$.form.col.ajouterEvenement(evnmt)
			}
			evnmt.setNbEvenementSecondaire($.formEvmt.nbCol)
			$.fenetreEditEvnt.afficher(!$.form.fermer);
			return true;
		}
				
		$.suppEvmt=function(){
			$.poubelle.push($.form.evnmt);
			$.form.evnmt.supprimer();
		}
		
		$.copierEvenement=function() {
			var f =$.formEvmt;
			$.evenementCopie = evenementCopie = new EvenementClassique();
			evenementCopie.setNom(f.titre).setPeriode(f).setDescription(f.description);
			evenementCopie.setCategorie(f.categorie).setNbCol(f.nbCol)
			$.fenetreEditEvnt.afficher(false);
		}
		
		$.collerEvenement=function() {
			var colonne = $.form.col;
			var per= new Periode($.form);	
			if ($.planning.testDepassementNombreColonnes(colonne, $.formEvmt.nbCol)) {
					alert("Impossible d'ajouter l'évènement : débordement de la page");
					return false;
			}
			$.formEvmt.titre=evenementCopie.getNom();
			$.formEvmt.description=evenementCopie.getDescription();
			$.formEvmt.categorie=evenementCopie.getCategorie();
			$.formEvmt.nbCol=evenementCopie.getNbCol();
			evenementCopie.setPeriode(per);
		}
		function viderInput(){
			$.formEvmt.titre="";
			$.formEvmt.description="";
		}
		$.afficherAjouterEvenement=function(col,ligneDeb){
			viderInput();
			$.mode="ajout";
			$.formEvmt.categorie = $.planning.getCategories()[0];
			$.titreCat.val = $.planning.getCategories()[0].getNom();
			$.formEvmt.nbCol = 1;
			$.fenetreEditEvnt.afficher(true);
			initHeureEvmt(ligneDeb,ligneDeb+1);	
			$.form.col=col;
		}
		
		$.afficherModifierEvenement=function(evmt,col){
			$.mode="modif";
			$.formEvmt.categorie = evmt.getCategorie();
			$.titreCat.val = $.formEvmt.categorie.getNom();
			var p = evmt.getPeriode();
			var hDeb = p.getHeureDebut();
			var hFin = p.getHeureFin();
			var mDeb = p.getMinuteDebut();
			var mFin = p.getMinuteFin();
			initHeureEvmt(hDeb,hFin,mDeb,mFin);
			$.formEvmt.titre=evmt.getNom();
			$.formEvmt.description=evmt.getDescription();
			$.fenetreEditEvnt.afficher(true);	
			$.form.col=col;	
			$.form.evnmt=evmt;
			$.formEvmt.categorie = evmt.getCategorie();
		}
		
		var initHeureEvmt=function(hDeb,hFin,mDeb,mFin){
			$.formEvmt.heureDeb=hDeb || 8;
			$.formEvmt.minuteDeb=mDeb || 0;
			$.formEvmt.heureFin=hFin || 9;
			$.formEvmt.minuteFin=mFin || 0;
		}
}