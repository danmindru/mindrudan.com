describe('Root Application Module:', function(){
  var RootController,
      scope;

  beforeEach(function(){
    module('dm');
  });

  describe('Root Config:', function(){
    it('should expose a pushAfterBootstrap method', function(){
      expect(dmConfig.pushAfterBootstrap).toBeTruthy();
    });

    it('should expose a appRootModuleName variable', function(){
      expect(dmConfig.appRootModuleName).toBeTruthy();
    });

    it('should expose a appMainVendorDependencies variable', function(){
      expect(dmConfig.appMainVendorDependencies).toBeTruthy();
    });
  });

  describe('Root Module:', function(){
    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      RootController = $controller('RootController', {$scope: scope});
    }));

    it('should have properly instantiate the Root Controller', function(){
      expect(RootController).toBeTruthy();
    });
  });
});