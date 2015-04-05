var controlleur = function ($scope){
		var $=publicAccessToScope=$scope || {};//pour les tests 
		$.form={fermer:true};//contient col derniere colonne cliqué, heureDeb, minuteDeb, heureFin, minuteFin
		$.mode="ajout";
		$.formEvmt = {categorie:""};
		$.formCol = {};
		$.formPerso={classCss:"cell"};
		
		$.poubelle= new Tab;
		$.annuler=function(){
			$.poubelle.length && $.poubelle.pop().undo();
		}
		
		$.tabFen=[];
		var creerFen = function(){
			for (var i in arguments){
				var fenName = arguments[i];
				var ind = $.tabFen.push($[fenName] = new Fenetre (false)) - 1;
				$.tabFen[ind].setName(fenName)
			}
		}
		
		//l'ordre compte
		creerFen("accueilVisible","grillePlanning","fenetreEditEvnt","fenetreAjoutColonne","fenetreModifHoraire",
			"fenCategorie","fenetreModifSupprColonne","fenImport","fenetreAjoutCategorie","fenExport","fenPolice");
		$.accueilVisible.afficher();
		$.grillePlanning.anime();
		$.largeurGrilleAvecHoraire=1090;
		$.ligne=[8,9,10,11,12,13,14,15,16];
		$.horaire = {heureDeb:8, heureFin:17, minDeb:0,minFin:0};
		$.evenementCopie = undefined;
		$.changerPoliceEcriture = new Fenetre (false);
		$.polStyle = {value:""};
		$.font=[
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

		$.titreCat={val:""};
		$.couleurCat={val:""};
		
		$.afficherAccueil = function(afficher){
				$.grillePlanning.afficher(!afficher);
		}

		$.undo = function(){
			var toUndo = poubelle.pop()
			toUndo.undo();
		}
						
		$.modifHeure = function(){
			if ($.horaire.heureDeb >= $.horaire.heureFin) {
				alert('Veuillez saisir un créneau horaire valide.');
			}else{
				$.planning.getHoraire().initialize($.horaire);
				$.ligne = [];
				for (var h = $.horaire.heureDeb ; h < $.horaire.heureFin; h++) {
				  $.ligne.push(h);
				}
				$.fenetreModifHoraire.afficher(false);
			}
		}
		
	
		
		
		
		/*******************************/
		/********Afficher formulaire*************/
		/*******************************/
		gererEvenmt($);
		gestionColonne($)
		gererCategorie($)
		gererPlanning($)
		
    
		
    
	$.setLigne1Hauteur=function(){
		$.planning.setHauteurLigne1($.accessToResizableElmt.offsetHeight);
	}
	
	$.tacheRedim=function(tache){
		var uneHeureEnpx = $$(".cellHoraire")[0].offsetHeight;
		var htrTacEnPx = $.accessToResizableElmt.offsetHeight;
		var ratioTacheHeure = htrTacEnPx / uneHeureEnpx;
		tache.getPeriode().setIntervalle(parseInt(ratioTacheHeure * 60));	
	}
    		
	
	void function glisserDeposer(){
			var tacheQuiBouge,colonneDepart;
			$.glisser=function(tache,salDep){
				colonneDepart=salDep;
				tacheQuiBouge=tache;		
			}
			$.deposer=function(colonneFinal,lig){
				var per=tacheQuiBouge.getPeriode();
				if (!$.planning.testDepassementNombreColonnes(colonneFinal, tacheQuiBouge.getNbCol())) {
					per.decallerA({heure:lig});
					colonneFinal.ajouterEvenement(tacheQuiBouge);
					colonneDepart.supprimerEvenement(tacheQuiBouge);	
				}
			}
	}()

	
	$.serializePlanning = function(){		
		$.export = serializeObjet($.planning);
		$.fenExport.afficher(true);
		return $.export;
	}
	
	$.parsePlanning = function(chaine){
		$.planning = parseChaine($.form.import);
		$.fenImport.afficher(false);
	}
	
	
	
	/*******************************/
	/********Changement police*************/
	/*******************************/
	$.changerPolice=function(){			
			var f=$.formPerso;
			$$("#changeStyle" + f.classCss).html("."+f.classCss+"{color:"+f.polCouleur+";font-size:"+
			f.polTaille+"px;font-family:"+f.polStyle+";}");
	}
	return $;
}