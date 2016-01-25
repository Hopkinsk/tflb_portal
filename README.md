About
-----

This application structure was based upon:

1. [Yeoman](http://yeoman.io/) and the [bbb generator](https://github.com/backbone-boilerplate/generator-bbb/): "yo bbb"
1. tbranyen's [GitHub Viewer](https://github.com/tbranyen/github-viewer) application which serves as an example of a simple BBB app
1. davidsulc's [RequireJS and Marionette](https://github.com/davidsulc/structuring-backbone-with-requirejs-and-marionette) example app which accompanies his [book](https://leanpub.com/structuring-backbone-with-requirejs-and-marionette)


Libraries
---------

* [Backbone.js](http://backbonejs.org/)
* [Backbone.Marionette](http://marionettejs.com/): this app's code follows the organisation described in the ["Gentle Introduction" book](https://leanpub.com/marionette-gentle-introduction).  
    * requirejs-text and requirejs-underscore-tpl to handle templates
    * backbone.picky to handle header selections
* JQuery 2.x
* Underscore
* [Bootstrap](http://getbootstrap.com/css/) 3.x
* [Clndr](https://kylestetz.github.io/CLNDR/)
* [Moment.js](http://momentjs.com/) 

See bower.json for exact versions.


Development
-----------

* Build: [Grunt](http://gruntjs.com/), including:
    * JSHint
    * LESS and cssmin
    * RequireJS

* Set up:
    * install node.js on your system
    * in the project directory, run:
    * ```npm install```   // Installs all node modules. ```npm list``` to show packages
    * ```bower install```   // Installs all dependencies. Run ```bower list``` to show packages
    
* Run:
    * Ensure testUrls are turned on in server_config.js
    * ```grunt```   // Builds everything. Release files are put in /dist
    * ```grunt server:development``` // Run front-end locally, accessible on http://0.0.0.0:9000
    * ```grunt watch``` // Run in background while developing to automatically compile





Application Overview
--------------------

* Admin: 
    * The administration tab responsible for downloading patient data
* Header
    * Application header
* Home
    * 'Login' view and 'New Participant' view
    * Login password
        * Generic login password hardcoded: apps/home/views.js
        * Valid study id logic: apps/home/views.js
* Study 
    * The study itself. Flow: Instructions -> Calendar -> Study Complete


