###_app-main module
--------------------------

This is the root application module.
It's main purpose is to bootstrap the document and provide a method to add module dependencies on the fly. That's done using the `absConfig` variable which exposes a `pushAfterBootstrap` method.

```javascript
var pushAfterBootstrap = function pushAfterBootstrap(lateModule){
  angular.module(lateModule, []);
  angular.module(appRootModuleName).requires.push(lateModule);
};
```


####What else does it do?
--------------------------
This module listens for title changes and updates the html `<title>` in `_app-main.controller.js`.


On each `$stateChangeSuccess` it scrolls to the top of the page in order to simulate a 'normal' page behavior.