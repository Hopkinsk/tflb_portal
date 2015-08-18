define(["app", "marionette"], function(App, Marionette){
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "study" : "show",
        }
    });

    var API = {
        show: function(currentStudy){
            require(["apps/study/controller"], function(Controller){
                App.startSubApp(null);
                Controller.show(currentStudy);
                //App.execute("set:active:header", "home");
            });
        },
    };


    App.on("study:show", function(currentStudy){
        App.navigate("study");
        API.show(currentStudy);
    });

    App.addInitializer(function(){
        new Router({
            controller: API
        });
    });

    return Router;
});