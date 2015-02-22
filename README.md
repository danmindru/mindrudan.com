#AngularJS boilerplate (study)
[![Build Status](https://travis-ci.org/danmindru/angular-boilerplate-study.svg?branch=master)](https://travis-ci.org/danmindru/angular-boilerplate-study) [![devDependency Status](https://david-dm.org/danmindru/angular-boilerplate-study/dev-status.svg)](https://david-dm.org/danmindru/angular-boilerplate-study#info=devDependencies)

This study looks at AngularJS boilerplates to find the best approaches so you don't have to. Although plenty of choices are available, they will do justice for only some types of applications. There is no one-size-fits all, universal boilerplate.
Plan your app well, prototype it and then refactor. If you still think it's a good idea to use a boilerplate, choose one and adapt it to your needs.

[See this app in action](http://abs.danmind.ru).

[See a live app built with this boilerplate](http://fadeit.dk).


##Getting started

Install `npm` and `bower` dependencies and run `grunt`, that's it. You are good to go.

```
$ sudo npm install
$ bower install
$ grunt
```

After running grunt, the source files will be built into `./build`.

When the app is ready for production, compile the app into `./application` by running:

```
$ grunt compile
```

###Requirements
`Grunt`, `grunt-cli` and `Bower` are required to build the application.
Read more about these packages [on the Grunt](http://gruntjs.com/installing-grunt) or [Bower](http://bower.io/) documentation pages.


##Table of contents

  1. [Philosophy](#philosophy)
  1. [Application structure](#application-structure)
  1. [Build and compile](#build-and-compile)
    * [Build](#build)
    * [Compile](#compile)
  1. [Core components](#core-components)
  1. [Third party components](#third-party-components)
  1. [Conventions and best practices](#conventions-and-best-practices)
  1. [Testing](#testing)
    * [Unit testing](#unit)
    * [End to end testing](#end-to-end)

##Philosophy

The modular nature of AngularJS (mainly) facilitated the development of numerous boilerplates. Based on the *insanely* comprehensive analysis done by Dan Cancro ([link](http://www.dancancro.com/comparison-of-angularjs-application-starters/)), it's noticeable that boilerplates exist for certain purposes and are not in fact the result of different approaches to achieve the same exact thing. There is no question that they do have the common purpose of quickly starting off development. At the same time, they are forcing some patterns/concepts that their creators think help in *some way*. This is where it's easy to see why they are different. There are many nuances to *some way*, it can be:
  * **flexibility**
  * **performance**
  * **learnability/documentation**
  * **efficiency (as in increased dev. speed)**
  * **testability**
  * **architecture (structure/overview/understanding)**
  * **maintainability**, etc

Some developers will value one of them more than the others. This doesn't mean that if testability is considered to be the most important, the others will be neglected. In fact, you probably won't be able to address one issue without affecting the others. It's easier to get this if you look at what this man had to say back when 'personal' and 'computer' where two unrelated terms:

> "The benefits expected of modular programming are: managerial-development time should be shortened because separate groups would work on each module with little need for communication: product flexibility-it should be possible to make drastic changes to
one module without a need to change others; comprehensibility-it should be possible to study the system one module at a time. The whole system can therefore be better designed because it is better understood."

> **Parnas, D. L. On the Criteria To Be Used in Decomposing Systems into Modules, 1972**


Modularity's umbrella can cover most of the decisions we consider when creating a boilerplate. Therefore, that's the first thing this study focuses on: getting modularity right.

Performance and comprehensibility are chosen as being the focus areas of this boilerplate. The two don't usually play well, that's why this makes for a somewhat noble goal. On one hand, performance decisions can be measured and justified. That's going to make some implementations easier to digest. On the other hand, comprehensibility is more personal and hard to measure. That's why it will require more research & testing.
(more on this in the [Conventions and best practices chapter](#conventions-and-best-practices))

Finally, the result of this study embraces the idea of `certain boilerplates work best for certain applications`. It's based on a real project with clear demands, a specific development setup, a given team & a specific set of tools (technologies).


##Application structure

```sh
root/
+—— src/
|   +—— app/
|   |   +—— _app-main/ # Root module -> application bootstrap
|   |   |   +—— _app-main.config.js
|   |   |   +—— _app-main.controller.js
|   |   |   +—— _app-main.init.js
|   |   |   +—— _app-main.spec.js
|   |   +—— module/ # Any custom module
|   |   |   +—— module.config.js # Registering a module
|   |   |   +—— module.controller.js
|   |   |   +—— module.e2e.js # Module E2E test
|   |   |   +—— module-page.html # Module views
|   |   |   +—— module.spec.js # Module Unit test
|   |   +—— feature/ # Any custom feature (multiple modules)
|   |   |   +—— module-one/
|   |   |   |   +—— module-one.config.js
|   |   |   |   +—— module-one.controller.js
|   |   |   |   +—— module-one-page.html
|   |   |   |   +—— module-one.spec.js
|   |   |   +—— module-two/
|   |   |   |   +—— module-two.config.js
|   |   |   |   +—— module-two.controller.js
|   |   |   |   +—— module-two-page.html
|   |   |   |   +—— module-two.spec.js
|   |   |   +—— feature.config.js
|   |   |   +—— feature.e2e.js
|   |   +—— shared/ # Shared modules
|   |   |   +—— directive/ # Any shared directive
|   |   |   |   +—— directive.directive.js
|   |   |   |   +—— directive.html
|   |   |   +—— layout/ # Shared layout directives
|   |   |   |   +—— footer.directive.js
|   |   |   |   +—— footer.html
|   |   |   |   +—— layout.config.js
|   |   |   |   +—— layout.controller.js
|   |   |   |   +—— shell.directive.js
|   |   |   |   +—— shell.html
|   |   |   +—— model/ # Any shared model
|   |   |   |   +—— model.config.js
|   |   |   |   +—— model.service.js
|   +—— assets/ # All application assets
|   |   +—— css/
|   |   +—— fonts/
|   |   +—— images/
|   |   +—— less/
|   +—— common/ # Common modules
|   |  +—— loggly/
|   |  |   +—— loggly.config.js
|   |  |   +—— loggly-exception-decorator.service.js
|   |  |   +—— loggly-exception-logging.service.js
|   |  |   +—— loggly-trace.service.js
|   +—— test/ # Protractor helper methods (e2e tests)
|   |  |   +—— helpers.protractor.js
|   +—— index.html # Application index file
```

Browse the `./src` directory for examples.

Go to [src/app/shared](https://github.com/danmindru/angular-boilerplate-study/tree/master/src/app/shared) for more info on shared modules.

Go to [src/common](https://github.com/danmindru/angular-boilerplate-study/tree/master/src/common) for more info on common modules.


##Build and compile

A 2-stage Grunt 'strategy' is implemented.

For development, files will go to `./build`.
For production, files will be concatenated, uglyfied / minified and moved to `./application`. (1 css, 1 js)


###Build
The build task will do all the work for development and create files in -> `./build`

```
$ grunt build
```
You can use the following command to start the build http server (port 8008 default):

```
$ grunt dev
```


###Compile
The compile task will do all the work for production and create files in -> `./application`

```
$ grunt compile
```
You can use the following command to start the build http server (port 8009 default):

```
$ grunt prod
```

###Watch
The `watch` task builds JavaScript, HTML and all assets (including tests and the gruntfiles themselves) when any of them are changed.


##Core components

The only 'core' AngularJS modules are:
* `_app-main`: contains logic for manually bootstrapping the application, sets up a module for `$templateCache`, allows defining 3rd party dependencies and exposes a method to register modules: `pushAfterBootstrap`.
* `layout`: (inside `app/shared`) contains the `ng-view` directive to display content based on the current route (`ui-router` specific directive). `layout` contains other directives for footer & navigation, but they can be removed. The `shell` directive is the one responsible for `ng-view`.


To start clean, you can remove the directories of sample modules or features: `/app/about`, `/app/home`, `/app/profile-feature` and `app/shared/profile-model` can be safely removed.

*Note: `app/shared/profile-model` is a dependency of `/app/home` and `/app/profile-feature`. Removing the modules also requires the navigation directive in `/app/shared/layout/` to be updated.*
```sh
# For the lazy developer, just run the following to
# remove the sample modules:

$ grunt clean:clean_samples
```


##Third party components

With the exception of `ui-router`, third party components that are used to build the sample application are just a recommendation. They can be replaced with any other similar components or completely removed.


<dl>
  <dt>bootstrap</dt>
  <dd>Twitter Bootstrap is used for it's CSS properties and icon-fonts (JS not included). If there are any plans to use Bootstrap's JavaScript, jQuery needs to be added (it's already downloaded in <code>./vendor/</code> when Bootstrap is resolved).<dd>

  <dt>LESS</dt>
  <dd>CSS can be pre-processed using LESS. To make things even sweeter, <b>grunt-autoprefixer</b> will add all CSS prefixes for you automatically. No more <b>-webkit-</b>, <b>-moz-</b>, <b>-ms-</b>, etc in your source files ever! (Support for SASS is NOT implemented)<dd>


  <dt>stacktrace.js</dt>
  <dd>Stacktrace is a components that allows debugging JavaScript by giving a full stack trace of function calls. It's a dependency of the <code>loggly</code> module in <code>./src/common/loggly/</code>.<dd>


  <dt>loggly-jslogger</dt>
  <dd>This component is a client-side (browser) logger and it's also a dependency of the <code>loggly</code> module in <code>./src/common/loggly/</code>. It allows setting up loggly and storing exceptions in the cloud.<br/><br/>
  Loggly is very easy to configure for your account; it only requires one change in <code>./src/common/loggly/loggly.config.js</code>.<dd>

  <dt>ui-router</dt>
  <dd>A routing framework for AngularJS. See more on the [ui-router repository](https://github.com/angular-ui/ui-router).<dd>


  <dt>angular-mocks</dt>
  <dd>A module that provides support to inject and mock Angular services into unit tests. Read the docs on the <a href="https://docs.angularjs.org/api/ngMock" target="_blank">Angular site</a>.<dd>


  <dt>Karma</dt>
  <dd>Karma is the chosen test runner for Jasmine unit tests. It can be configured in <code>./config/karma.conf.js</code>.<dd>


  <dt>Protractor</dt>
  <dd>Protractor is an end-to-end test framework for AngularJS applications. Protractor is built on top of WebDriverJS (it requires a running Selenium Server, read more about here: <a href="#end-to-end">End to end testing</a>).<dd>


  <dt>Travis CI</dt>
  <dd>Travis CI is a hosted continuous integration service. It is integrated with GitHub and automatically runs unit and end to end tests for each build. You need to sign up in order to use this service (free for open source projects).

  <a href="https://travis-ci.org/danmindru/angular-boilerplate-study/builds" target="_blank">See the builds for this repository on Travis CI</a><dd>


  <dt>SauceLabs</dt>
  <dd>Whenever Travis CI runs a new build, SauceLabs provides a standalone Selenium server and runs end to end tests automatically (here's an example: <a href="https://saucelabs.com/tests/a40d7a31221843049b69a37a575e3b60" target="_blank">Build 64</a>). You need to sign up to use this service (<a href="https://saucelabs.com/opensauce" target="_blank">free for open source projects</a>).

  To set up Sauce Labs with Travis CI you have to provide a SauceKey and SauceUsername securely in <code>./.travis.yml</code> (you can remove all 3 secure env variables). See how to do it in <a href="https://docs.saucelabs.com/ci-integrations/travis-ci/" target="_blank">SauceLabs' docs</a>.<dd>
</dl>

###Grunt 'contrib' tasks
Grunt tasks are used in order to automate the build and compilation of the app code.
Open `./package.json` to see the installed Grunt tasks. An external configuration file is used to define file locations in `./config/grunt.conf.js`. Both the config file and `./grunfile.js` are well commented. Reading it would be a good way to fully understand how the Grunt tasks work, but you don't have to.

`jit-grunt` and `grunt-newer` are used to speed up tasks.


##Conventions and best practices

###Workflow conventions
These conventions should be followed during normal development.

--------------------------

####Working with Grunt
As a rule, Grunt tasks (`./grunfile.js`) shouldn't require any alteration. Changes should be made in `./config/grunt.conf.js`. Before adding/changing a task, it's always a good idea to go through all tasks and check if it's not already there.

--------------------------

####Adding a third party dependency
Grunt 'glues together' the various application components and moves Bower dependencies where they belong (i. e. `../bootstrap/dist/css/bootstrap.min.css` -> `../assets/css`). Due to the way Bower dependencies are organized (well they aren't, really), this process cannot be fully automated. To add a third party dependency, you need to:

**Step 1**: Install it
```
$ bower install <component-name>
```
**Step 2**: Update the build object in `./config/grunt.conf.js`
```javascript
...
build: {
  vendor_js: {
    ...
    './vendor/component-name/dist/js/component.js' //not minified
    ...
  }
}
...
```
**Step 3**: Update the compile object in `./config/grunt.conf.js`
```javascript
...
compile: {
  vendor_min_js: {
    ...
    './vendor/component-name/dist/js/component.min.js' //minified
    ...
  }
}
...
```

*<b>Step 4 (optional)</b> : If it's an Angular core component (such as `ui-route`), it should be added to the `appMainVendorDependencies` Array in the root module's init file (`./src/app/_app-main/_app-main.init.js`).*


Providing different source files for build and compile phases is done for a couple reasons:

1. During build (aka. development time) meaningful error messages/exceptions should be provided for debugging.
1. During build, it's useful to have the code 'beautified' (line numbers) and not 'mangled' (full variable names)
1. There is no reason to minify a script if it's already minified by a vendor
1. Attempting to minify a vendor script can break it (it can have it's own minifying settings)

For a more in-depth look, `./config/grunt.conf.js` contains useful comments.

--------------------------

####Naming conventions


#####Files and directories
Lower case, separated by a dash
* Directory: `src/directory-name/`
* Filename: `file-name.js`

--------------------------

#####AngularJS directories
* Module dirs: `<module-name>/`
* Feature dirs: `<feature-name>-feature/` (contains multiple modules)
* Model dirs: `<module-name>-model/` (contains services)

--------------------------

#####AngularJS component filenames
* Init/globals: `<module-name>.init.js`
* Config blocks: `<module-name>.config.js`
* Run blocks: `<module-name>.run.js`
* Services: `<module-name>.service.js` (including factories, providers, values)
* Controllers: `<module-name>.controller.js`
* Directives: `<module-name>.directive.js`
* Filters: `<module-name>.filter.js`
* Views: `<view-name>.html`

--------------------------

#####Other files
* E2E tests: `<module-name>.e2e.js`, `<feature-name>.e2e.js` (depending on the case)
* E2E helpers: `<name>.protractor.js`
* Unit tests: `<module-name>.spec.js`

--------------------------

#####Angular modules
* Module names: `<namespace>.<moduleName>`
* Feature names (collection of modules): `<namespace>.<featureName>Feature`
* Nested modules (inside a feature): `<namespace>.<featureName>Feature.<moduleName>`

(i.e. `abs.about`, `abs.profileFeature`, `abs.profileFeature.providerPage`)


* Core modules: `<namespace>.core<ModuleName>`
* Core features: `<namespace>.core<FeatureName>Feature`
* Core nested module: `<namespace>.core<FeatureName>Feature.core<ModuleName>`

(i.e. `abs.coreLayout`)


* Common modules: `<namespace>.common<ModuleName>`
* Common features: `<namespace>.common<FeatureName>Feature`
* Common nested: `<namespace>.common<FeatureName>Feature.common<ModuleName>`

(i.e. `abs.commonLoggly`)


* Model names: `<namespace>.<modelName>Model`
* Nested models: `<namespace>.<parentModel>Model.<modelName>Model`

(i.e. `abs.profileModel`, `abs.profileModel.customerModel`)

--------------------------

#####Angular module components
* Controllers: `<ControllerName>Controller`
* Models: `<ModelName><ModelType>` (ModelType could be service, factory, value)
* Directives: `<directiveName>`
* Filters: `<filterName>`

--------------------------

####Creating a module
To create a module, make a directory in a corresponding location:
* `./src/app/` for any basic module
* `./src/app/shared/` for any shared module (i.e. directive, shared layout)
* `./src/common/` for any [common module](https://github.com/danmindru/angular-boilerplate-study/tree/master/src/common)

After making the directory, create a config file (`<module-name>.config.js`). In this file the module needs to be registered as a dependency of the application root.
```javascript
absConfig.pushAfterBootstrap('<namespace>.<module-name>');
```
That's it, use it as any other Angular module.

Here's a more practical example:
```javascript
absConfig.pushAfterBootstrap('abs.home');

angular.module('abs.home').config(homeConfig);
homeConfig.$inject = ['$log'];

function homeConfig($log){
  $log.warn('I am being practical');
}
```

--------------------------

####Component dependency injection

Dependencies are injected into components by creating a $inject property on the component function:
```javascript
angular.module('user').controller('UserController', userController);

userController.$inject = ['$scope', '$stateParams', 'ProviderModelService'];
function userController($scope, $stateParams, ProviderModelService){
  //controller logic
}
```

Note on annotation:

First of all automatic annotation is not implemented, although it can be achieved with `ng-annotate`. This is so because every now and then `ng-annotate` backfires. After many hours of debugging, you'll promise yourself to never use it and avoid such situations. Therefore, the 'old-school' annotation is used, but with a twist: it's not done inline with the component (in this case controller) definition. This makes it easy to have an overview of dependencies and easily manage them while being minification-proof.

--------------------------

####File locations during build/compile
<dl>
  <dt>Shared views</dt>
  <dd>
  All views in <code>./src/app/shared/</code> will be located in <code>./src/shared-views/</code> after build or compile.

  <br/><br/>
  <em>Note: compiling will combine all shared views in a module and use $templateCache to define their location. The directory above won't exist in the compile phase, but the views will still be accessible in the same location.</em>
  </dd>

  <dt>'Non-shared' views</dt>
  <dd>All other views will be available in <code>./build/views/</code>(build phase) and <code>./application/views/</code>(compile phase).</dd>

  <dt>Static assets</dt>
  <dd>With the exception of stylesheet files which are concatenated and compiled, all assets will maintain their directory structure.</dd>
</dl>

--------------------------

####Routes

Routes are defined in module configuration blocks. In the case of features, routes are defined in the feature configuration block. The idea behind keeping the route logic in each module or feature is to encourage a higher modularity of components. Moreover, keeping module logic

Examples are available in the configuration block of the [home module](https://github.com/danmindru/angular-boilerplate-study/blob/master/src/app/home/home.config.js) and [profile feature](https://github.com/danmindru/angular-boilerplate-study/blob/master/src/app/profile-feature/profile-feature.config.js).

--------------------------

####Performance & Misc
Other style considerations:
* Only perform DOM manipulations with directives
* Use ng-bind, avoid interpolations
* Use the bind-once syntax to reduce watchers where possible
* Always use the 'controller as' syntax
* Each file holds one component (be it controller, directive, etc)
* Used data-* for attributes
* Use ui-sref instead of href for internal anchors
* Try to use 'ng-repeat as' while filtering to display a 'no results' message
* Don't use inline filters and ng-repeats if there's another way to achieve the same thing


##Testing

To run all tests use:

```
$ grunt test
```
*Note: you should have a selenium server running, see [end to end testing](#end-to-end)*

*Note: this won't build or compile, but just run all unit and end to end tests for the build binaries, which should be present in `./build`.*


###Unit
To run unit tests it will come in handy to install karma-cli (if you don't have it yet).
Unit tests will run on PhantomJS, but if you have binaries for other browsers you are encouraged to add them in `karma.conf.js`

```
$ npm install -g karma-cli
$ grunt test:unit
```

You can use the continuous task while writing tests to auto refresh your changes

```
$ grunt karma:continuous
```

Unit tests will run in the grunt default task (which builds first)

```
$ grunt
```

###End to end
Protractor is used for running end to end tests. Before running the tests be sure the webdriver-manager is updated.
Protractor's base url is `http://localhost:8008/#!`, but can be changed in `protractor.conf.js` - just make sure the application port matches the base url.
In order to run Protractor tests, a selenium server needs to be running (default at `http://localhost:4444/wd/hub`):

```
$ node_modules/protractor/bin/webdriver-manager start
$ grunt test:e2e
```

If you are running tests for the first time don't forget to update the webdriver

```
$ node_modules/protractor/bin/webdriver-manager update
```

##What's coming next
* Add `grunt-perfbudget` for better performance monitoring, perhaps together with `grunt-pagespeed`
* Add `uncss` in the workflow (with `phantomcss`)
* Switch to Angular dependency 'strict mode'
* Extend documentation: provider visual resources for build & sample application structure; add a list of 'features' in the boilerplate about page
* Create unit tests for the home, customer-index & provider-index modules
* Extend E2E tests to at least cover all routes

Other future additions:
- *Include `phantomas` in the workflow - make perf reporting trends ?*
- *Reduce repetition in CSS - use `parker`, `colorguard` ?*
- *Use debug: false in production ?*
- *Try `useApplyAsync` for httpProvider ?*
- *Implement a form and animation example ?*
- *Change remaining inline filters to controller filters ?*
- *Work on Windows support (shell commands) ?*
- *Move dev/prod demo to github pages ?*


##Mentions

Special thanks to the people at [fadeit.dk](http://fadeit.dk) for their patience and to [Niels Henrik Juul Hansen](https://github.com/nielshenrikjuulhansen) for guiding me.


##License

Copyright (c) Dan Mindru <mindrudan@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.