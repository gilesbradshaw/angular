'use strict';


/**
 * @ngdoc function
 * @name abrmsApp.controller:EqUnitCtrl
 * @description
 * # EqUnitCtrl
 * Controller of the abrmsApp
 */


angular.module('abrmsApp')
  .controller('EqUnitCtrl',['$scope', '$routeParams', 'entityManagerFactory', function ($scope,$routeParams, entityManagerFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var manager = entityManagerFactory.newManager();
    var query = entityManagerFactory.get.eqUnit();
    if($routeParams.orderBy)
    {
      if($routeParams.orderBy.split(',').length>1 && $routeParams.orderBy.split(',')[1]==='desc')
      {
        $scope.orderDescending=true;
        query=query.orderBy($routeParams.orderBy.split(',')[0], true);
      }
      else
      {
        query=query.orderBy($routeParams.orderBy.split(',')[0], false); 
      }
      $scope.order = $routeParams.orderBy.split(',')[0];
    }
    else
    {
      query=query.orderBy('eQ_UN_ID');
    }
    var page=0;
    if($routeParams.pageID && parseInt($routeParams.pageID) )
    {
      page=parseInt($routeParams.pageID);
      
    }
    query=query.skip(page*10).take(10);
    //.orderBy('eQ_UN_ID').skip(10).take(10)
    manager.executeQuery(query).then(function(data){
      if(data)
      {
        $scope.data=data.results;
      }
    });
  }]);
