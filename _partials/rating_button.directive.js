(function(){
  
  angular.module('MainModule').directive('ratingButton', _directive );

  _directive.$inject = ['$rootScope'];

  function _directive($rootScope) {
      return {
          restrict: "E",
          replace: true,
          template: '<button type="button" class="btn btn-circle" ng-class="getRatingClass()"></button>',
          scope: {
              buttonRating: "="
          },
          link: function(scope, elem, attr) {
              scope.getRatingClass = function() {
                  if (!scope.buttonRating)
                      return '';
                  else if (scope.buttonRating.toUpperCase() === 'GREEN')
                      return 'btn-success';
                  else if (scope.buttonRating.toUpperCase() === 'YELLOW')
                      return 'btn-warning warning-text';
                  else if (scope.buttonRating.toUpperCase() === 'RED')
                      return 'btn-danger';
                  else if (scope.buttonRating.toUpperCase() === 'BLUE')
                      return 'btn-info';
              }
          }
      };
  };
})();