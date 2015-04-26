(function() {
  var app = angular.module('hospital',['app-directives']);

  app.controller('functionController',function(){
      this.page = 1;

      this.selectPage = function(setPage){
        this.page =   setPage;
      }
  });

})();