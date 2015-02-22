###config
--------------------------

This directory is a collection of configuration files that **can** be moved from the root dir (keeps root clean).

The config files here are used for karma, grunt and protractor. They could represent any configuration file as long as it's not a problem to move it from root.


Production and development files are provided for protractor, as well as configuration files for continuous integration. This allows running protractor tests on different enviornments without causing issues.

See `./gruntfile.js` (the protractor task) for more info.