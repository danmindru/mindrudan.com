/*
 * This variable contains the root module name, root vendor dependecies and
 * exposes the pushAfterBootstrap method.
 *
 * Custom module dependencies should be added using pushAfterBootstrap,
 * don't add them here.
 *
 * 'sharedViewsModule' is a module generated in the compile phase with the
 * help of grunt-html2js.
 * All shared views are definied in this module and added to $templateCache.
 * See more in ./gruntfile.js, 'html2js' task.
 *
 */
var absConfig = (function applicationInit(){
  var appRootModuleName = 'abs';
  var appMainVendorDependencies = ['ui.router', 'sharedViewsModule'];

  var pushAfterBootstrap = function pushAfterBootstrap(lateModule){
    angular.module(lateModule, []);
    angular.module(appRootModuleName).requires.push(lateModule);
  };

  return {
    appRootModuleName: appRootModuleName,
    appMainVendorDependencies: appMainVendorDependencies,
    pushAfterBootstrap: pushAfterBootstrap
  };
})();

/*
 * 'sharedViewsModule' is definied by default, but only used by html2js
 * during the compile phase.
 *
 * Although this definitions is not needed for the build phase, it
 * simplifies the grunt setup. This approach is preferred because
 * performance is not the target in the build phase.
 *
 */
angular.module('sharedViewsModule', []);


/*
 * The root module is registered and afterwards the document is manually
 * bootstrapped on 'angular.ready'.
 *
 */
angular.module(absConfig.appRootModuleName, absConfig.appMainVendorDependencies);

angular.element(document).ready(function applicationBootstrap() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') {
      window.location.hash = '#!';
    }

    angular.bootstrap(document, [absConfig.appRootModuleName]);
});