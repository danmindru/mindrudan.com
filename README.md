<!-- add image here -->
###mindrudan.com - website front-end source
<hr/>

The mindrudan.com website is built on top of [this AngularJS boilerplate](https://github.com/dandaniel/angular-boilerplate-study).
[See it in action](http://mindrudan.com).

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