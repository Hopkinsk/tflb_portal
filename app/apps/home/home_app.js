define(["app", "marionette"], function(App, Marionette){
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "home" : "show",
        }
    });

    var API = {
        show: function(){
            require(["apps/home/controller"], function(Controller){
                App.startSubApp(null);
                Controller.show();
                App.execute("set:active:header", "home");
            });
        },
    };

    App.on("home:show", function(){
        App.navigate("home");        
        API.show();
    });

    App.addInitializer(function(){
        new Router({
            controller: API
        });
    });

    return Router;
});