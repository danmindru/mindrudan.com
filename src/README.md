###src
--------------------------

All source files are located in this directory.
Here's an overview:

```sh
+—— app/
|   +—— _app-main/ # Root module -> application bootstrap
|   +—— custom-module/ # Any custom module, such as 'home'
|   |   +—— custom-module.config.js # Registering a module
|   |   +—— custom-module.controller.js
|   |   +—— custom-module-page.html # Module Views
|   +—— custom-feature/ # Any custom feature (multiple modules)
|   |   +—— client-page/
|   |   |   +—— client-page.config.js
|   |   |   +—— client-page.controller.js
|   |   |   +—— client-page-index.html
|   |   |   +—— client-page-edit.html
|   |   +—— provider-page/
|   |   |   +—— provider-page.config.js
|   |   |   +—— provider-page.controller.js
|   |   |   +—— provider-page-index.html
|   |   |   +—— provider-page-edit.html
|   |   +—— custom-feature.config.js # Registering a feature
|   +—— shared/ # Shared modules
|   |   +—— layout/ # Shared layout directives
+—— assets/ # All application assets
|   +—— css/
|   +—— fonts/
|   +—— images/
|   +—— less/
+—— common/ # Common modules
+—— test/ # Protractor helper methods (e2e tests)
+—— index.html # Application index file
```

Go to [src/app/shared](https://github.com/danmindru/angular-boilerplate-study/tree/master/src/app/shared) for more info on shared modules.

Go to [src/common](https://github.com/danmindru/angular-boilerplate-study/tree/master/src/common) for more info on common modules.
