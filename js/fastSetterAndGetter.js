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
