###src/common
--------------------------

Common components are highly decoupled modules and are likely to be used in multiple applications without any change. They can have vendor dependencies but will not be a dependency of any module in `./src/app`.

You can think of common modules as modules interacting with/overwriting Angular core. The example module provided (`loggly`) is an Angular exception decorator which is used to add custom behaviour to Angular's exception handling.

Other components that can be placed in this directory are: translation modules, maps modules or JavaScript 'prototype' extensions.