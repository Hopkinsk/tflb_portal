define(function(require, exports, module) {
    "use strict";

    // External dependencies.
    var _ = require("underscore");
    var $ = require("jquery");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    require("bootstrap");
    
    var App = new Marionette.Application();

    App.addRegions({
        headerRegion: "#header-region",
        mainRegion: "#main-region"
    });

    App.navigate = function(route,  options){
        options = options || {};
        Backbone.history.navigate(route, options);
    };

    App.getCurrentRoute = function(){
        return Backbone.history.fragment;
    };

    App.startSubApp = function(appName, args){
        var currentApp = appName ? App.module(appName) : null;
        if (App.currentApp === currentApp){ return; }
        if (App.currentApp){
            App.currentApp.stop();
        }
        App.currentApp = currentApp;
        if (currentApp){
            currentApp.start(args);
        }
    };

    // detecting unauthorized AJAX responses (from invalid CSRF or login session)
    App.interceptUnauthorized = function(){
        // Only do this once.      
        if (Backbone && Backbone._ajaxintercepted){ return; }
        if (Backbone){ Backbone._ajaxintercepted = true; }

        $(document).ajaxError(function(e, jqxhr, settings, exception){
            if (jqxhr && jqxhr.status===401){
                App.goLogin();
            }
        });

          // Detect logout state: 
          // If logged out, the server will have redirected to the login page (302).
          // We can't detect that as AJAX follows the redirect transparently, 
          // so we rely on the server sending a special header with the login page.
          // N.B. use ajaxComplete: depending on the expected response format, this might be either success or error.
        $(document).ajaxComplete(_.bind(function(e, jqxhr, settings){
            var isLogin = jqxhr.getResponseHeader("X-Login-Page");
            if (isLogin){
                App.goLogin();
            }
        }, this));
    };
    // monitoring server activity
    App.monitorAjax = function(){
      // Only do this once.
      if (Backbone && Backbone._ajaxmonitored){ return; }
      if (Backbone){ Backbone._ajaxmonitored = true; }    
      $(document).ajaxSuccess(_.bind(function(e, jqxhr, settings){
          // detect logout state: 
          // If logged out, the server will have redirected to the login page.
          // We can't tell that here, so rely on the server sending a special header.  
          var isLogin = jqxhr.getResponseHeader("X-Login-Page");
          if (isLogin){
              App.goLogin();
          }

          // notify the session monitor of activity
          if (App.sessionMonitor){
              App.sessionMonitor.recordServerActivity();
          }
      }, App));        
    };

    App.do_keepalive =  function(){
      if (App.Entities.urls.keepAlive){
        $.get(App.Entities.urls.keepAlive);
      }
    };

    App.goLogin = function(){
        document.location.href = App.Entities.urls.logout;
    };

    App.goLogout = function(){
        document.location.href = App.Entities.urls.logout;
    };

    App.isAdmin = function(){
        return window.server_session && !!server_session.admin;
    };

    App.getCurrentUser = function(){
        return window.server_session.user;
    };

    App.on("start", function( /*SessionMonitor */){
        if (Backbone.history){
            require([
                "apps/home/home_app",
                "apps/study/study_app",
                "apps/admin/admin_app"
                ], 
                function () {    
                    //App.interceptUnauthorized();  
                    //App.sessionMonitor = new App.SessionMonitor(window.server_session);
                    if (App.sessionMonitor){
                        var that = App;

                        App.listenTo(App.sessionMonitor, "doLogout", function(){
                            that.goLogout();
                        });

                        App.listenTo(App.sessionMonitor, "doKeepAlive", function(){
                            that.do_keepalive();
                        });

                        App.monitorAjax();
                    }

                    Backbone.history.start();

                    if (App.getCurrentRoute() === ""){
                        App.trigger("home:show");
                    }
                }
            );
        }
    });



    var Behaviors = App.module("Behaviors");
    Marionette.Behaviors.behaviorsLookup = function(){
        return Behaviors;
    }; 
    

    return App;    
});