define(["app", "marionette"], function(App, Marionette){
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "study/:id" : "show",
        }
    });

    var API = {
        show: function(studyId){
             //if there is no study redirect back to homepage 

             console.log("show ", studyId);
            require(["apps/study/controller"], function(Controller){
                App.startSubApp(null);
                Controller.show(studyId);
                //App.execute("set:active:header", "home");
            });
        },
    };


    App.on("study:show", function(studyId){
        App.navigate("study" + encodeURIComponent(studyId));
        API.show(studyId);
    });

    App.addInitializer(function(){
        new Router({
            controller: API
        });
    });

    return Router;
});