describe('Root Application Module:', function(){
  var RootController,
      scope;

  beforeEach(function(){
    module('abs');
  });

  describe('Root Config:', function(){
    it('should expose a pushAfterBootstrap method', function(){
      expect(absConfig.pushAfterBootstrap).toBeTruthy();
    });

    it('should expose a appRootModuleName variable', function(){
      expect(absConfig.appRootModuleName).toBeTruthy();
    });

    it('should expose a appMainVendorDependencies variable', function(){
      expect(absConfig.appMainVendorDependencies).toBeTruthy();
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