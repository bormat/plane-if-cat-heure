function load(arg,dossier){
	arg = arg.split(",");
	for (var i in arg){
		var script = document.createElement("script");
		script.src = dossier +arg[i] + ".js";
		document.body.appendChild(script);
	}
}
load("fastSetterAndGetter,serialisation,heritage/bortoHeritage,ElementGraphique,Planning,Colonne,Evenement,Periode,Graphique,Categorie,Page","../js/")
load("gererCategorie,gererColonne,gererCreationPlanning,gererEvenement","../cont/")
load("controllerImpl","../")
