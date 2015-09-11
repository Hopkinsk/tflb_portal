define(["app", "marionette"], function(App, Marionette){
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "study/:id" : "show",
            "study/complete" : "studyComplete"
        }
    });

    var API = {
        show: function(studyId){
             //if there is no study redirect back to homepage 

            require(["apps/study/controller"], function(Controller){
                App.startSubApp(null);
                Controller.show(studyId);
                //App.execute("set:active:header", "home");
            });
        },
        studyComplete: function(study){
            require(["apps/study/controller"], function(Controller){
                App.startSubApp(null);
                Controller.studyComplete(study);
                //App.execute("set:active:header", "home");
            });
        }
    };


    App.on("study:show", function(studyId){
        App.navigate("study/" + encodeURIComponent(studyId));
        API.show(studyId);
    });

    App.on("study:complete", function(study){

        App.navigate("study/complete");// + encodeURIComponent(studyId) + "/complete");
        API.studyComplete(study);
    });

    App.addInitializer(function(){
        new Router({
            controller: API
        });
    });

    return Router;
});