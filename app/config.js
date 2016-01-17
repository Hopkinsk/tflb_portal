// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
    paths: {
        // Make vendor easier to access.
        "vendor": "../vendor",

        // Almond is used to lighten the output filesize.
        //"almond": "../vendor/bower/almond/almond",

        // Opt for Lo-Dash Underscore compatibility build over Underscore.
        "underscore": "../vendor/bower/lodash/dist/lodash.underscore",

        // Map remaining vendor dependencies.
        "jquery": "../vendor/bower/jquery/dist/jquery",
        "backbone": "../vendor/bower/backbone/backbone",
        "backbone.picky": "../vendor/bower/backbone.picky/lib/amd/backbone.picky",
        "marionette": "../vendor/bower/backbone.marionette/lib/backbone.marionette",
        "text": "../vendor/bower/requirejs-text/text",
        "tpl": "../vendor/bower/requirejs-underscore-tpl/underscore-tpl",
        "bootstrap": "../vendor/bower/bootstrap/dist/js/bootstrap",
        "jquery-ui": "../vendor/bower/jquery-ui/jquery-ui.min",
        "bootstrap-dialog": "../vendor/bower/bootstrap3-dialog/src/js/bootstrap-dialog",
        "moment": "../vendor/bower/moment/min/moment.min",
        "clndr": "../vendor/bower/clndr/clndr.min",
        //"qtip": "../vendor/bower/qtip2/jquery.qtip.min",
        "jquery-file-download" : "../vendor/bower/jquery-file-download/src/Scripts/jquery.fileDownload"
    },

    map: {
        // jquery.fileupload requires jquery.ui.widget, but we are already including the full jquery-ui.
        "jquery.fileupload": {
            "jquery.ui.widget": "jquery-ui"
        }
    },

    shim: {
        // This is required to ensure Backbone works as expected within the AMD
        // environment.
        "backbone": {
            // These are the two hard dependencies that will be loaded first.
            deps: ["jquery", "underscore"],

            // This maps the global `Backbone` object to `require("backbone")`.
            exports: "Backbone"
        },
        "underscore": {
            exports: "_"
        },
        "backbone.picky": ["backbone"],
        'bootstrap-dialog': {
            deps: ["backbone"]
        },
        "marionette": {
            deps: ["backbone"],
            exports: "Marionette"
        },
        "tpl": ["text"],
        "bootstrap": ["jquery"],
        // "clndr": {
        //     deps: ["moment", "jquery", "underscore"],
        //     exports: "clndr"
        //},
        // "qtip": {
        //     deps: ["jquery"],
        //     exports: "qtip"
        // }

    }
});
