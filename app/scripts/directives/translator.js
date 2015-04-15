'use strict';

var Enumerable=window.Enumerable;

angular.module('language',[])
.controller('translatorCtrl', ['$scope', '$routeParams',function($scope,$routeParams){
      $scope.language = Enumerable.from($scope.languages).singleOrDefault(function(x){
          return x.sY_Lang===$routeParams.langID;
        });
      $scope.language = $scope.language || Enumerable.from($scope.languages).singleOrDefault(function(x){
          return x.sY_Lang==='EN';
        });
    }
  ])
.directive('translator', function(){
  return {
    controller:'translatorCtrl',
    scope: {
      languages:'=',
      description:'@'
      
    },
    template:'{{language[description]}}'
  };

});
