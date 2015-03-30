"use strict";
/***************************
***** Classe periode ******
****************************/
//public

	var _toMin	=	function(tps){
		return tps % 60;
	};
	var _toHeure=	function(tps){
		return ((tps % 1440) - _toMin(tps))/60;
	};

Class.create("Periode", {	
	initialize:function(P){
		this._debutEnMin = (P.heureDeb || 0) * 60 + (P.minuteDeb || 0);
		this._FinEnMin	 = (P.heureFin || 0) * 60 + (P.minuteFin || 0);
	},
		
	getHeureDebut:function (){
		return _toHeure(this._debutEnMin);
	},
	getMinuteDebut:function (){
		return _toMin(this._debutEnMin);
	},		
		
	getHeureFin:function (){
		return _toHeure(this._FinEnMin);
	},
	getMinuteFin:function (){
		return _toMin(this._FinEnMin);
	},	
	
	getEnMinDebut:function (){
		return this._debutEnMin % 1440;
	},	
	getIntervalle:function(){
		return this._FinEnMin - this._debutEnMin ;
	},
	setIntervalle:function(tps){
		this._FinEnMin = this._debutEnMin + tps ;
	},
	decallerA:function(P){
		var delta=P.heure*60 - this._debutEnMin;
		this._debutEnMin += delta;
		this._FinEnMin	 += delta;
	}		
})