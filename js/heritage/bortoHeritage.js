//Createur de Classe par Bortolaso Mathieu
function getClass(superName){
	function contientPasSuper(funct){
		var name = superName.replace("$","");
		var reg= new RegExp("\\b"+name+"\\b")
		return ! reg.test(funct);
	}
	var f = function(){};
	
	//crée les methode getteur et setteur et les copie dans l'objet proto
	function addGetEtSet(proto, methodes){
		function maj(chaine) {
			return chaine.charAt(0).toUpperCase() + chaine.slice(1);
		}
		function suppUndefined(obj,propr){
			propr.forEach(function(prop){
				if (!obj[prop]) obj[prop] = "";
			})
		}
		suppUndefined(methodes,['getteurEtSetteur','getteur','setteur'])
		methodes.getteur = methodes.getteur.split(",");
		methodes.setteur = methodes.setteur.split(",");
		for( var o=0; o<2;o++){
			methodes.getteur.forEach(function(prop){
				if (prop != ""){
					proto["get"+maj(prop)] = new Function("return this._"+prop);
				}
			})
			methodes.setteur.forEach(function(prop){
				if (prop != ""){
					proto["set"+maj(prop)] = new Function("o","this._"+prop+"=o;return this;"); 
				}
			})
			//et on refait un tour pour ceux qui ont le getteur et le setteur
			methodes.setteur = methodes.getteur = methodes.getteurEtSetteur.split(",");
		}
		delete methodes.getteurEtSetteur;
		delete methodes.getteur;
		delete methodes.setteur;	
	}
	
	//seulement pour l'appel à super
	function getMethod(methodes,prop,parent){
		return function(){
			var self=this;
			window[superName]= function (){
				return parent.prototype[prop].apply(self, arguments);
			}
			return  methodes[prop].apply(self, arguments);
		}	
	}
	
	var Class = function(){}
	Class.serial = function(){
		seen = []
		var obj=JSON.stringify(publicAccessToScope.planning, function(key, val) {
		   if (val != null && typeof val == "object") {
				val.serializationName= val.serializationName;
				if (seen.indexOf(val) >= 0)
					return;
				seen.push(val)
			}
			return val
		})
		var plan = obj;
		plan.getColonneHoraire().setPlanning(plan);
		plan.getPages().forEach(function(page){
			page.setPlanning(plan);
			page.getColonnes().forEach(function(colonne){
				colonne.setPage(page);
				colonne.getTaches().forEach(function(tache){
					tache.setColonne(colonne)
				})
			})
		})
		return obj
	}
	Class.parse=function(nom){
		var obj=JSON.parse(nom, function (k, v) {
			if (v && v.serializationName){
				v.__proto__ = eval(v.serializationName).prototype;
			}
			return v;                
		});
		return obj;
	}
	Class.create=function(nom, methodes){
		methodes = methodes || {};
		var parent = methodes.extend || f;
		parent.prototype.initialize=parent.prototype.initialize || parent;
		var enfant = function(){
			proto.initialize.apply(this, arguments);
		}
		var proto = enfant.prototype = Object.create(parent.prototype);
		this.addMethods(enfant, methodes)
		proto.initialize =  proto.initialize || methodes.initialize || parent;
		//return enfant;
		window[nom]=enfant;
		proto.serializationName = nom;
		for( var prop in enfant ){
			Object.defineProperty(enfant, prop, {
				enumerable: false, //exlu des for in;
			});
		}
	}
	
	
	Class.addMethods = function(laClass, methodes){
		var proto = laClass.prototype;
		addGetEtSet(proto, methodes);
		methodes = methodes || {};
		var parent =  methodes.extend || laClass.extend || f;
		for(var prop in methodes){
			proto[prop]= (contientPasSuper(methodes[prop]))
			? methodes[prop]
			:getMethod(methodes, prop, parent);
		}
	}	
	return Class;
	
}
//choisir le nom de la variable globale contenant le super ici _super super tout court sera un mot clef dans Ecma 6 donc déconseillé
var Class = getClass("$super");
