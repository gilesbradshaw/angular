'use strict';

/**
 * @ngdoc overview
 * @name abrmsApp
 * @description
 * # abrmsApp
 *
 * Main module of the application.
 */
angular
  .module('abrmsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource', 
    'ngRoute',
    'ngSanitize', 
    'ngTouch',
    'breeze.angular',
    'language'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/EQ_Unit/:langID/:blockID/:pageID', {
        templateUrl: 'views/eq_unit.html',
        controller: 'EqUnitCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }); 


function emFactory(breeze) {
  // Convert properties between server-side PascalCase and client-side camelCase
  breeze.NamingConvention.camelCase.setAsDefault();
 
  // Identify the endpoint for the remote data service
  var serviceRoot = 'http://localhost:2072/';
  var serviceName = serviceRoot + 'breeze/rms'; // breeze Web API controller
 
  // the "factory" services exposes two members
  var factory = {
    newManager: function() {return new breeze.EntityManager(serviceName);},
    serviceName: serviceName,
    get:
      {
        eqUnit:function(){
          return (new breeze.EntityQuery()).from('EQ_Unit').expand(['eQ_Unit_Language','eQ_UnitClass.eQ_UnitClass_Language']);
          //return manager.executeQuery(query);
        }
      }
  };
 
  return factory;
}

angular.module('abrmsApp')
       .factory('entityManagerFactory', ['breeze', emFactory]);


