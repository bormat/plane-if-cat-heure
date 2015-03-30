var stringToFunct = function(s){
	var f = new Function(s);
	return f.call(this);
}


// 3eme parametre permet de ne faire que le set ou que le get par exemple 
// addGSet(Colonne,["taches","titre",'largeur'],"set") ne créera que les setters
var addGSet=function(obj,param,gset){
	var methods={}
	param.forEach(function(prop){
			var propMaj=prop.charAt(0).toUpperCase()+prop.substr(1,prop.length-1);
			if (gset!="set"){
				methods["get"+propMaj] =function(){
					return this['_'+prop]
				};
			}
			if (gset!="get"){
				methods["set"+propMaj] = function(o){ 
					this['_'+prop]=o; 
					return this;
				}
			}
	})
	Class.addMethods(obj,methods);
}

var addGetterDetableau = function(obj,methods){
	var methods=methods ||{};
	methods.forEach(function(prop){
		var propPluriel = "_"+prop+"s";
		var propMaj = prop.charAt(0).toUpperCase() + prop.substr(1);
		var propMajPluriel = propMaj+"s";
		
		methods["get" + propMajPluriel] = function(){ 
			return this[propPluriel];
		}
		methods["get" + propMaj] 		= function(i){ 
			return this[propPluriel][i];
		};
		methods["ajt" + propMaj] 		= function(elmt){ 
			this[propPluriel].push(elmt)
		}
		methods["sup" + propMaj] 		=  function(elmt){
			this[propPluriel].suppElmt(elmt);
		};	
		
	})
	Class.addMethods(obj, methods);
}



//exemple
//addGetterDetableau(class1,["elmt"])
//donne 
//getElmts=function(){
//	return this._elmt;
//}
//getElmt=function(i){
//	return this._elmt[i];
//}
