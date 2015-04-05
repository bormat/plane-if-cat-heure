'use strict';

var publicAccessToScope;
angular.module('planning', ['mod']);
var mod = angular.module('mod',[]);

mod.controller('planController',controlleur);

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




