'use strict';

describe('Controller: EqUnitCtrl', function () {

  // load the controller's module
  beforeEach(module('abrmsApp'));

  var EqUnitCtrl,
    scope,testEntityManagerFactory,testEntityManager,eqUnitPromise,query,controller, breezeDone;
    

  // Initialize the controller and a mock scope and entity manager
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller=$controller;
    //breezeDone=function(done){done();};
    testEntityManager = {
      executeQuery:function(){return eqUnitPromise;}    
    };
    query={
      orderBy:function(){return query;},
      take:function(){return query;},
      skip:function(){return query;}
    };
    eqUnitPromise={
      then:function(done){
        if(breezeDone){
          setTimeout(function(){
            breezeDone(done);
          },1);
        }
      }
    };
    testEntityManagerFactory= {
      newManager:function (){
        return testEntityManager;  
      },
      get:
      {
        eqUnit:function(){
          return query;
          
        }
      }
    };
    
  }));
  afterEach(function(){
    testEntityManagerFactory=undefined;
    testEntityManager=undefined;
    breezeDone=undefined;
  });

  it('should attach a list of awesomeThings to the scope', function () {
    EqUnitCtrl = controller('EqUnitCtrl', {
      $scope: scope,
      entityManagerFactory:testEntityManagerFactory
    });
    expect(scope.awesomeThings.length).toBe(3);
    
  });

  it('should create a new entity manager', function () {
    spyOn(testEntityManagerFactory, 'newManager').and.callThrough();
    EqUnitCtrl = controller('EqUnitCtrl', {
      $scope: scope, 
      entityManagerFactory:testEntityManagerFactory
    });
    expect(testEntityManagerFactory.newManager).toHaveBeenCalled();
  });

  it('should get eqUnit', function (done) {
    var data = {results:{}};
    breezeDone=function(iAmDone){
      iAmDone(data);
      expect(scope.data).toBe(data.results);
      done();
    };
    spyOn(testEntityManagerFactory.get, 'eqUnit').and.callThrough();
    spyOn(testEntityManager, 'executeQuery').and.callThrough();
    spyOn(eqUnitPromise, 'then').and.callThrough();
    EqUnitCtrl = controller('EqUnitCtrl', {
      $scope: scope,
      entityManagerFactory:testEntityManagerFactory
    });
    expect(testEntityManager.executeQuery).toHaveBeenCalledWith(query);
    expect(testEntityManagerFactory.get.eqUnit).toHaveBeenCalled();
    expect(eqUnitPromise.then).toHaveBeenCalled();
    
    
  });

  it('should order eqUnit by eq_UN_ID as default', function (done) {
    var data = {results:{}};
    breezeDone=done;
    spyOn(query, 'orderBy').and.callThrough();
    EqUnitCtrl = controller('EqUnitCtrl', {
      $scope: scope,
      entityManagerFactory:testEntityManagerFactory
    });
    expect(query.orderBy).toHaveBeenCalledWith('eQ_UN_ID');  
  });

  it('should order eqUnit by orderBy route param', function (done) {
    var data = {results:{}};
    breezeDone=function(){
      done();
    };
    spyOn(query, 'orderBy').and.callThrough();
    EqUnitCtrl = controller('EqUnitCtrl', {
      $scope: scope,
      $routeParams:{
        orderBy:'testOrder'
      },
      entityManagerFactory:testEntityManagerFactory
    });
    expect(query.orderBy).toHaveBeenCalledWith('testOrder', false);  
    expect(scope.order).toBe('testOrder');
    expect(scope.orderDescending).toBe(undefined);
  });

  it('should order eqUnit by orderBy route param - descending', function (done) {
    var data = {results:{}};
    breezeDone=done;
    spyOn(query, 'orderBy').and.callThrough();
    EqUnitCtrl = controller('EqUnitCtrl', {
      $scope: scope,
      $routeParams:{
        orderBy:'testOrder,desc'
      },
      entityManagerFactory:testEntityManagerFactory
    });
    expect(query.orderBy).toHaveBeenCalledWith('testOrder', true);  
    expect(scope.order).toBe('testOrder');
    expect(scope.orderDescending).toBe(true);
  });

  it('should skip 0 take 10 by default ', function (done) {
    var data = {results:{}};
    breezeDone=done;
    
    spyOn(query, 'skip').and.callThrough();
    spyOn(query, 'take').and.callThrough();
    EqUnitCtrl = controller('EqUnitCtrl', {
      $scope: scope,
      $routeParams:{
        
      },
      entityManagerFactory:testEntityManagerFactory
    });
    expect(query.skip).toHaveBeenCalledWith(0); 
    expect(query.take).toHaveBeenCalledWith(10); 

  });

  it('should [page according to page route parameter] ', function (done) {
    var data = {results:{}};
    breezeDone=done;
    
    spyOn(query, 'skip').and.callThrough();
    spyOn(query, 'take').and.callThrough();
    EqUnitCtrl = controller('EqUnitCtrl', {
      $scope: scope,
      $routeParams:{
        pageID:10
      },
      entityManagerFactory:testEntityManagerFactory
    });
    expect(query.skip).toHaveBeenCalledWith(100); 
    expect(query.take).toHaveBeenCalledWith(10); 

  });
});
