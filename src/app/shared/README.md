####src/app/shared
--------------------------
If a module can be identified as having cross-cutting concerns, it should be moved into this directory.

Often these modules are represented by a model: the `profile-model` is one example. It is a dependency of the `home` and `profile-feature` modules, therefore it is shared.
Modules that define directives are also a good candidate for this directory.


####src/app/shared/layout
--------------------------
The layout module is a collection of directives that define various shared sections: footer, navigation, etc.

The `shell` directive is the most important component, as it markup that renders all other directives defined in this module. The `shell` (or by it's directive definition: `app-shell`) is used in `./src/index.html`.

The `shell` also contains the `ng-view` directive, which is used by `ui-router` to mark the area where all dynamic (template or view) content will be rendered.