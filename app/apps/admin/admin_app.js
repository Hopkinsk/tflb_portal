define(["app", "marionette"], function(App, Marionette){
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "admin" : "show"
        }
    });

    var API = {
        show: function(){
             //if there is no study redirect back to homepage 
            require(["apps/admin/controller"], function(Controller){
                App.startSubApp(null);
                Controller.show();
                App.execute("set:active:header", "admin");

            });
        },
    };


    App.on("admin:show", function(studyId){
        App.navigate("admin");
        API.show();
    });

    App.addInitializer(function(){
        new Router({
            controller: API
        });
    });

    return Router;
});