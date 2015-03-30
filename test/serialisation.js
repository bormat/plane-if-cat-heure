	/*****************************************************************************************/
	/************************Objet et contenu enumerable vers Chaine**************************/
	/*****************************************************************************************/
	
	//myid bien que stocké dans la chaine n'est plus utile à la fin mais on le garde dans un soucis algorithm simple
	var serializeObjet = function(theMainObject){
		if(!(theMainObject instanceof Object)){
			throw "veuillez passer un objet et non un type primitif"
		}
		var tab=[];
		function genererTableauDeChaine(obj){
			var chaine = ["{"];
			if(obj.serializationName){
				obj.serializationName = obj.serializationName;// ceci n'est pas inutile __proto__ vers objet
			}
			Object.defineProperties(obj,{
				"myid": {
					enumerable: false,
					value: tab.push(obj) - 1,
					writable:true,
					configurable:true,
				},
			});
			for(var i in obj){
				if (obj.hasOwnProperty(i)){
					chaine.push(i + ":");
					if ( obj[i] instanceof Object){
						if (tab.indexOf(obj[i])== -1){
							genererTableauDeChaine(obj[i]);
						}
						chaine.push("'tab["+obj[i].myid+"]'");
					}else{
						if(typeof obj[i] === "number" ){
							chaine.push(obj[i]);
						}else{
							chaine.push("'"+obj[i]+"'");
						}
					}
					chaine.push(",");
				}
			}
			chaine[chaine.length-1] = "}";
			tab[obj.myid] = chaine.join("");	
		}
		
		function StringifyObjetDeDepart(obj){
			var chaine = ["{"];
			genererTableauDeChaine(obj);
			for ( var i in tab){
				chaine.push(i + ":" + tab[i]);
				chaine.push(",");
				delete tab[i].myid;//si on veut refaire une génération plus tard
			}
			chaine[chaine.length-1] = "}";			
			return chaine.join("")
		}	
		return StringifyObjetDeDepart(theMainObject);
	}


	/*****************************************************************************************/
	/************************************Chaine vers Objet************************************/
	/*****************************************************************************************/

		
	var parseChaine = function(chaine){
		//function principal
		function parse(chaine){
			eval("tab="+chaine);
			genererHeritage2()
			for( var i in tab){ 
				var obj=tab[i];
				for( var prop in obj){				
					if (contientUneRef(obj,prop)){
						eval ("obj[prop]="+ obj[prop]);
					}
					/*les tableaux peuvent être parsé mais deviennent des objets, utiliser un objet
					simulant un tableau de preference*/
					//genererHeritage(obj[prop])
				}
			}
			nettoyage();
			remettreLenghtAuFauxTableaux();
		}
		
		function contientUneRef(obj,prop){
			return  prop && obj[prop].indexOf && obj[prop].indexOf("tab[") != -1 
		}
		
		function genererHeritage2(obj){
			for( var i in tab){ 
				var theClass = window[tab[i].serializationName] || {};
				theClass.prototype = theClass.prototype || {};
				var obj = Object.create(theClass.prototype) // bonne classe
				// on remmet les infos
				for (var j in tab[i]){
					obj[j] = tab[i][j];
				}
				tab[i] = obj 
			}
		}	
		
		function genererHeritage(obj){
			if(obj.serializationName){
				obj.__proto__ = window[obj.serializationName].prototype; /*bien sur ça marche que si vous avez le nom de la classe dans cette attribut(à metre dans le prototype de la classe)*/
			}
		}		
		function nettoyage(){
			for(var i in tab){
				delete tab[i].serializationName;
				delete tab[i].myid;
				delete tab[i].$$hashKey;
			}
		}
		
		function remettreLenghtAuFauxTableaux(){
			for( var i in tab){
				if(tab[i] instanceof Array){
					var max=-1;
					Object.defineProperties(tab[i], {
						"length": {
							enumerable: false,
							writable: true
						},
					});
					for( var j in tab[i]){
						if (!isNaN(j) && j>length){
							max=j;
						}
					}
					tab[i].length = max+1;
				}		
			}
		}
		var tab;
		parse(chaine);
		return tab[0];
	}