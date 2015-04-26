(function() {
  var app = angular.module('app-directives',[]);

  app.directive('headInclude', function() {
  return {
    restrict: 'E',
    templateUrl: 'includes/head.html'
   };
	});

})();