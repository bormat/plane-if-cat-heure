'use strict';

var publicAccessToScope;
angular.module('planning', ['mod']);
var mod = angular.module('mod',[]);
mod.controller('planController', ['$scope',
    function ($scope){
		publicAccessToScope=$scope;
		var poubelle=[];
		$scope.formPage = {nbParPage : 1};
		$scope.clicOnAimant=false;
		//initialisation//
		var planning;
		var form=$scope.form={};//contient col derniere colonne cliqué, heureDeb, minuteDeb, heureFin, minuteFin
		$scope.mode="ajout";
		form.categorie="";
		$scope.tabFen=[];
		$scope.creerFen = function(){
			for (var i in arguments){
				var fenName = arguments[i];
				$scope.tabFen.push($scope[fenName] = new Fenetre (false));
			}
		}
		$scope.creerFen("fenetreEditEvnt","fenetreAjoutColonne","fenetreModifHoraire",
			"fenCategorie","fenExport","fenetreModifSupprColonne","fenImport","fenetreAjoutCategorie","grillePlanning")
		$scope.tabFen.push($scope.accueilVisible = new FenetreAvecTransition(true));
		var formCol=$scope.formCol = {};
		$scope.largeurGrilleAvecHoraire=1090;
		$scope.ligne=[8,9,10,11,12,13,14,15,16];
		$scope.horaire = {heureDeb:8, heureFin:17, minDeb:0,minFin:0};
		$scope.cellStyle ={};
		var evenementCopie = $scope.evenementCopie = undefined;
		var changerPoliceEcriture = $scope.changerPoliceEcriture = new Fenetre (false);
		$scope.polStyle = {value:""};
		$scope.font=[
            'Arial, Helvetica, sans-serif',
			'Arial Black, Gadget, sans-serif',
			'Comic Sans MS, cursive',
			'Courier, monospace',
			'Courier New, Courier, monospace',
			'Garamond, serif',
			'Georgia, serif',
			'Gill Sans,Geneva,sans-serif',
			'Impact, Charcoal, sans-serif',
			'Lucida Console, Monaco, monospace',
			'Lucida Sans Unicode, Lucida Grande, sans-serif',
			'MS Sans Serif, Geneva, sans-serif',
			'MS Serif, New York, sans-serif',
			'Palatino Linotype,Book Antiqua,Palatino,serif',
			'Symbol, sans-serif',
			'Tahoma, Geneva, sans-serif',
			'Times New Roman, Times, serif',
			'Trebuchet MS, Helvetica, sans-serif',
			'Verdana, Geneva, sans-serif',
			'Webdings, sans-serif',
			'Wingdings, Zapf Dingbats, sans-serif',
            ];

		var titreCat = $scope.titreCat={val:""};
		var couleurCat = $scope.couleurCat={val:""};
		var fenetreAjoutCategorie = $scope.fenetreAjoutCategorie = new Fenetre(false);
		

		$scope.afficherAccueil = function(afficher){
			$scope.accueilVisible.afficher(afficher);
			$scope.grillePlanning.afficher(!afficher);
		}
		
		/*******************************/
		/******** Initialisation *******/
		/*******************************/
		$scope.creerPlanning = function(mode) {
			$scope.afficherAccueil(false);
			//ne pas effacer le planning si le mode est le même
			if (planning && planning.getMode() == mode){
				return ;
			}
			planning = $scope.planning = new Planning(mode)	;
			planning.addPage();
			$scope.cellStyle={};
			$scope.getHauteurCell=function(){
				$scope.cellStyle.height="calc("+planning.getHauteurCell()+")";
				return $scope.cellStyle.height;
			}
			
			if (planning.getMode() === 'hebdomadaire') {
				initialiserPlanningHebdo();
			}
			planning.setHoraire(new Periode($scope.horaire));
			planning.ajouterCategories("#ccb800","Default");
			planning.ajouterCategories("red","sport");
			planning.ajouterCategories("orange","foot");
			planning.ajouterCategories("white","sieste");
			planning.ajouterCategories("green","ceuillete");
			planning.ajouterCategories("cyan","avion");
			planning.ajouterCategories("yellow","bronzette au soleil");
			planning.repartirColonnes();
		}
		
		function initialiserPlanningHebdo() {			
			['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].forEach(function(jour){
				planning.ajoutColonne(new Colonne(jour));
			})
		}
		
		//*******************************/
		/********formulaire*************/
		/*******************************/
		
		$scope.validationFormulaireEvenement= function(){
			var res = true;
			if (isNaN(form.nbCol) || form.nbCol < 0 || isNaN(form.heureDeb) || isNaN(form.minuteDeb) || isNaN(form.heureFin) || isNaN(form.minuteFin)) {
				return false;
			}
			
			if (!form.titre) {
        alert('Veuillez saisir un titre valide.');
      } else {
        if($scope.mode =="ajout") {
          res = $scope.ajoutEvmt();
        }
        
        if ($scope.mode == "modif") {
          res = $scope.modifEvmt()
        }
			
        if(res != false) {
          fenetreEditEvnt.afficher(!fenetreEditEvnt.isAfficher());
        }
      }
		}
			
		$scope.ajoutEvmt=function(){
				var colonne = form.col;
				var per= new Periode(form);	
				/*if (planning.testDepassementNombreColonnes(colonne, form.nbCol)) {
						alert("Impossible d'ajouter l'évènement : débordement de la page");
						return false;
				}*/
				var evnmt=new EvenementClassique (form.titre,form.description,per,form.categorie, form.nbCol);
				colonne.ajouterEvenement(evnmt);
				var indexEvenementPrin = form.col.getTaches().indexOf(evnmt);
				if (form.nbCol > 1) {
					var colonnes = planning.getColonnes();
					var indexColonne = colonnes.indexOf(form.col);
					evnmt.setNbEvenementSecondaire(form.nbCol)
				} 					
		}
	
		
		
		$scope.modifEvmt=function(){		
			if (planning.testDepassementNombreColonnes(form.col, form.nbCol)) {
					alert("Impossible de modifier l'évènement : débordement de la page");
					return false;
			}
			form.evnmt.initialize(form.titre, form.description, new Periode(form), form.categorie, form.nbCol);
			form.evnmt.setNbEvenementSecondaire(form.nbCol)
		}
		
		$scope.suppEvmt=function(){
			poubelle.push(form.evnmt);
			form.col.supprimerEvenement(form.evnmt);
			
			if (form.evnmt.getNbCol() > 1 ){
				$scope.suppEvenementCommun();
			}
      fenetreEditEvnt.afficher(false);
		}
		
		$scope.suppEvenementCommun=function() {
			var tabEvenementSecondaire = form.evnmt.getTabEvenementAutreCol();
			var tabColonne = planning.getColonnes();
			var indexColEvenementPrincipal = tabColonne.indexOf(form.col);
			var cpt = 1;
			tabEvenementSecondaire.forEach (function(evenementSecondaire) {
				tabColonne[indexColEvenementPrincipal+cpt].supprimerEvenement(evenementSecondaire);
				cpt++;
			})
		}
		
		$scope.copierEvenement=function() {
			$scope.evenementCopie = evenementCopie = new EvenementClassique (form.titre,form.description,0,form.categorie, form.nbCol);
			fenetreEditEvnt.afficher(false);
		}
		
		$scope.collerEvenement=function() {
			var colonne = form.col;
			var per= new Periode(form);	
			if (planning.testDepassementNombreColonnes(colonne, form.nbCol)) {
					alert("Impossible d'ajouter l'évènement : débordement de la page");
					return false;
			}
			form.titre=evenementCopie.getNom();
			form.description=evenementCopie.getDescription();
			form.categorie=evenementCopie.getCategorie();
			form.nbCol=evenementCopie.getNbCol();
			evenementCopie.setPeriode(per);
		}
		
		$scope.reinitialiser=function(){
			if(confirm('Vous êtes sur le point de réinitialiser votre planning.\n\n'
					+ 'Attention, cette action est irréversible !') && planning.getColonnes().length>0){
				planning.reinitialiser();
			}
		}
		
		/*Categorie/Couleur */
		$scope.focusCouleur=function(categorie){
			form.categorie = categorie;
			$scope.titreCat.val = form.categorie.getNom();
		} 
		
		$scope.modifierCategorie=function(){
			
			var nom = form.categorie.getNom();
			var couleur = form.categorie.getCouleur();

			if(nom != titreCat.val) {
				if(planning.estCategorieExistante(new Categorie(couleur,titreCat.val)) != null) {
					titreCat.val = nom;
					alert("Catégorie déjà existante");
				} else {
					var listeCategories = planning.getCategories();
					var res = new Categorie();
					var indice;
					listeCategories.forEach (function(cat) {
						if (cat.getNom() == nom && cat.getCouleur() == couleur) {
							indice = listeCategories.indexOf(cat);
							res.setNom(titreCat.val);
							res.setCouleur(couleur);
							listeCategories[indice] = res;
						}
					})	
					planning.setCategories(listeCategories);
					form.categorie = res;
				}
			}
		}
		
		$scope.supprimerCategorie=function(){
			var nom = form.categorie.getNom();
			var couleur = form.categorie.getCouleur();
			var catSup = planning.estCategorieExistante(new Categorie(couleur,nom));
			if (catSup != null) {
				planning.supprimerCategorie(catSup);
			}
			form.categorie = '';
			titreCat.val = '';
		}
		
		$scope.ajoutCategorie=function() {
			if(planning.estCategorieExistante(new Categorie(couleurCat.val,titreCat.val)) != null) {
				alert("Catégorie déjà existante");
			} else {
				if (planning.getCategories().length >= 10) {
					alert("Vous ne pouvez ajouter que 10 catégories");
				} else {
					planning.ajouterCategories(couleurCat.val,titreCat.val);
					fenetreAjoutCategorie.afficher(false);
					titreCat.val ="";
					form.categorie="";
					$scope.fenCategorie.afficher(true);
				}
			}
		}
		
		$scope.afficherAjouterCategorie=function() {
			$scope.fenCategorie.afficher(false);
			titreCat.val ="";
			couleurCat.val = "#000000";
			fenetreAjoutCategorie.afficher(true);
		}
		
		$scope.afficherModifierCategorie=function() {
			$scope.fenCategorie.afficher(true);
			titreCat.val ="";
			couleurCat.val = planning.getCategories()[0].getCouleur();
		}
		
		$scope.retourModifierCategorie = function() {
			fenetreAjoutCategorie.afficher(false);
			$scope.fenCategorie.afficher(true); 
			form.categorie = '';
		}
		
		$scope.getCategoriesUtilises = function() {
			var resListeCat = [];
			var pages = planning.getTabPage();
			pages.forEach (function(page) {
				var colonnes = page.getColonnes();
				colonnes.forEach (function(colonne) {
					var taches = colonne.getTaches();
					taches.forEach (function(evnmt) {
						if(evnmt instanceof EvenementClassique) {
							var cat = evnmt.getCategorie();				
							if(resListeCat.indexOf(cat) == -1 && cat != planning._categories[0]){
								resListeCat.push(cat);
							}
						}
					});
				});
			});
			return resListeCat;
		}
		
		/*******************************/
		/********Afficher formulaire*************/
		/*******************************/
		$scope.afficherAjouterEvenement=function(col,ligneDeb){
			viderInput();
			$scope.mode="ajout";
			form.categorie = planning._categories[0];
			titreCat.val = planning._categories[0].getNom();
			form.nbCol = 1;
			$scope.fenetreEditEvnt.afficher(true);
			initHeureEvmt(ligneDeb,ligneDeb+1);	
			form.col=col;
		}
		
		$scope.afficherModifierEvenement=function(evmt,col){
			$scope.mode="modif";
			form.categorie = evmt.getCategorie();
			titreCat.val = form.categorie.getNom();
			var p=evmt.getPeriode();
			var hDeb=p.getHeureDebut();
			var hFin=p.getHeureFin();
			var mDeb=p.getMinuteDebut();
			var mFin=p.getMinuteFin();
			initHeureEvmt(hDeb,hFin,mDeb,mFin);
			form.titre=evmt.getNom();
			form.description=evmt.getDescription();
			$scope.fenetreEditEvnt.afficher(true);	
			form.col=col;	
			form.evnmt=evmt;
			form.categorie = evmt.getCategorie();
		}
		
		var initHeureEvmt=function(hDeb,hFin,mDeb,mFin){
			$scope.form.heureDeb=hDeb || 8;
			$scope.form.minuteDeb=mDeb || 0;
			$scope.form.heureFin=hFin || 9;
			$scope.form.minuteFin=mFin || 0;
		}
    
		
    $scope.colonneRedim=function(col){
		var largeurElm = $scope.accessToResizableElmt.offsetWidth;
		var largeurPlanning=$$(".A4")[0].offsetWidth;
		/*debut suppression de bug*/
		col.setLargeurPx(largeurElm+1, largeurPlanning); 
		$scope.$apply();
		/*fin suppression de bug*/
		col.setLargeurPx(largeurElm, largeurPlanning)
		planning.repartirColonnes();
	}
	$scope.setLigne1Hauteur=function(){
		planning.setHauteurLigne1($scope.accessToResizableElmt.offsetHeight);
	}
	$scope.tacheRedim=function(tache){
		var uneHeureEnpx = $$(".cellHoraire")[0].offsetHeight;
    var htrTacEnPx = $scope.accessToResizableElmt.offsetHeight;
		var ratioTacheHeure = htrTacEnPx / uneHeureEnpx;
		tache.getPeriode().setIntervalle(parseInt(ratioTacheHeure * 60));	
  }
    


		$scope.alert=function(width){
			alert(width );				
		};	
		
		
		/*Colonne*/
		
		$scope.afficherModifierColonne = function() {
			formCol.titre = "";
			$scope.fenetreAjoutColonne.afficher(true);
		}
		
		$scope.ajoutColonne = function() {
			if (!formCol.titre) {
        alert('Veuillez saisir un titre valide.');
      } else {
        planning.ajoutColonne(new Colonne(formCol.titre));
        planning.repartirColonnes();
        $scope.fenetreAjoutColonne.afficher(false);
      }
		}
		
		$scope.afficherModifColonne=function(colo){
			formCol.titre = colo.getTitre();
			$scope.fenetreModifSupprColonne.afficher(true);
			formCol.col=colo;			
		}
		
		$scope.modifColonne=function(){
			if (!formCol.titre) {
        alert('Veuillez saisir un titre valide.');
      } else {
        formCol.col.setTitre(formCol.titre);
        $scope.fenetreModifSupprColonne.afficher(false);
      }
		}
		
		$scope.supprColonne=function(){
			//poubelle.push(formCol.col);
			planning.supprimerColonne(formCol.col);
			$scope.fenetreModifSupprColonne.afficher(false);
		}
		
	
		$scope.modifHeure = function() {
			if ($scope.horaire.heureDeb >= $scope.horaire.heureFin) {
        alert('Veuillez saisir un créneau horaire valide.');
      } else {
        planning.getHoraire().initialize($scope.horaire);
        $scope.ligne = [];
        for (var h = $scope.horaire.heureDeb ; h < $scope.horaire.heureFin; h++) {
          $scope.ligne.push(h);
        }
        $scope.fenetreModifHoraire.afficher(false);
      }
		}
		
		function viderInput(){
			form.titre="";
			form.description="";
		}
		
		(function glisserDeposer(){	
			var tacheQuiBouge,colonneDepart;
			$scope.glisser=function(tache,salDep){
				colonneDepart=salDep;
				tacheQuiBouge=tache;		
			}
			$scope.deposer=function(colonneFinal,lig){
				var per=tacheQuiBouge.getPeriode();
				if (!planning.testDepassementNombreColonnes(colonneFinal, tacheQuiBouge.getNbCol())) {
					per.decallerA({heure:lig});
					colonneFinal.ajouterEvenement(tacheQuiBouge);
					colonneDepart.supprimerEvenement(tacheQuiBouge);	
				}
			}
		})()
	
	
	/*open source @autor Bortolaso*/
	$scope.serializePlanning = function(){
		
		$scope.export = serializeObjet(planning);
		$scope.fenExport.afficher(true);
		return $scope.export;
	}


	
	$scope.parsePlanning = function(chaine){
		$scope.planning = planning = parseChaine($scope.form.import);
		$scope.fenImport.afficher(false);
	}
	
	
	
	/*******************************/
		/********Changement police*************/
		/*******************************/
		$scope.changerPolice=function(){
			
			var check =" ";
			var classCss=" ";
			check = document.getElementById("rd_int").checked;
			
			if (!check){
				classCss='cell';
			} else {
				classCss='changeTexte';
			}
			
			var polTaille = document.getElementById("policeTaille").value;
			var polColor = document.getElementById("policeCouleur").value;
			 var stylePol = $scope.polStyle.value;
			
			
			document.getElementById("changeStyle"+classCss).innerHTML="       ."+classCss+"{color:"+polColor+";font-size:"+polTaille+"px;font-family:"+stylePol+";}";
		}
}]);

// directive de drag and drop attribut glisser et deposer dans la html

mod.directive('glisser', [function() {
	return{
		link:function(scope, element, attr){
			var el=element[0];
			el.addEventListener('dragstart', function(e){
				scope.$eval(attr.glisser);//appelle la fonction de l'attribut glisser avec ses parametres 
				scope.$apply();				
				try	{
					e.dataTransfer.setData('text/html', "firefox à besoisn de cette ligne inutile");
				}catch(e){
					e.dataTransfer.setData('text', "juste comme ça");
				}
			}, false);
		}
	}
}])

mod.directive('deposer', [function(){
	return {
		link:function(scope, element, attr){
			var el=element[0];
			el.addEventListener('drop', function(e){
				scope.$eval(attr.deposer); //appelle la fonction de l'attribut deposer avec ses parametres 
				e.preventDefault();
				scope.$apply()
			}, false);
			el.addEventListener('dragover', function(e) {
				e.preventDefault(); // Annule l'interdiction de "drop"
			}, false);
		}
	}	
}])

mod.directive('resizabledroite', function () {
    return {
        link: function (scope, elem, attr) {
            elem.resizable({
              handles: 'e'
            });
            elem.on('resizestop', function (evt, ui) {	
				//on rajoute l'accès à l'element
				publicAccessToScope['accessToResizableElmt']=elem[0];
				publicAccessToScope.clicOnAimant=false;
                scope.$eval(attr.resizabledroite)
				scope.$apply();
            });
        }
    };
});
mod.directive('resizablebas', function () {
    return {
        link: function (scope, elem, attr) {
            elem.resizable({
              handles: 's'
            });
            elem.on('resizestop', function (evt, ui) {	
				//on rajoute l'accès à l'element
				publicAccessToScope['accessToResizableElmt']=elem[0];
				publicAccessToScope.clicOnAimant=false;
                scope.$eval(attr.resizablebas)
				scope.$apply();
            });
        }
    };
});


mod.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
  
    scope.$watch(attrs.showFocus, 
      function (newValue) { 
        $timeout(function() {
            newValue && element.focus();
        });
      },true);
  };    
});




