var t=function(u){
	this.t=u
}

var tu = Class.create({
	extend:t,
	//constructeur
	initialize:function (u){
		$super(u);
	}	
	
})

var Tab = Class.create(Array, {
	//constructeur
	initialize:function (tab){
		//attribut protected
		this._tab = tab || [];
	}	
	
})
addGSet(Tab,[]);
