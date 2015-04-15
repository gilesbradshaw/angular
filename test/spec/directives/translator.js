'use strict';

describe('Directive: translator', function () {

  // load the controller's module
  beforeEach(module('language'));

  var EqUnitCtrl,
    scope,controller;
    

  // Initialize the controller and a mock scope and entity manager
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller=$controller;
    
  }));
  afterEach(function(){
    
  });

  it('should produce null languages with no input', function () {
   var ctrl = controller('translatorCtrl', {
      $scope: scope,
      $routeParams:{
        langID:'testLang'
      }
    });
    expect(scope.language).toBe(null);
    
  });

  it('should language with input', function () {
  scope.languages=[
    {sY_Lang:'not this'},
    {sY_Lang:'testLang'},
  ];
   var ctrl = controller('translatorCtrl', {
      $scope: scope,
      $routeParams:{
        langID:'testLang'
      }
    });
    expect(scope.language).toBe(scope.languages[1]);
    
  });

  it('should pick EN as default language with input', function () {
  scope.languages=[
    {sY_Lang:'EN'},
    {sY_Lang:'not this'},
  ];
   var ctrl = controller('translatorCtrl', {
      $scope: scope,
      $routeParams:{
        langID:'testLang'
      }
    });
    expect(scope.language).toBe(scope.languages[0]);
    
  });


});
