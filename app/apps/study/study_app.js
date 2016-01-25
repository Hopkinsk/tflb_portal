define(["app", "marionette"], function(App, Marionette){
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "study/:studyId" : "show",
        }
    });

    var API = {
        show: function(studyId){
             //if there is no study redirect back to homepage 
            require(["apps/study/controller"], function(Controller){
                App.startSubApp(null);
                Controller.show(studyId);
            });
        },
    };


    App.on("study:show", function(studyId, id){
        App.navigate("study/" + encodeURIComponent(studyId));
        API.show(studyId);
    });

    App.addInitializer(function(){
        new Router({
            controller: API
        });
    });

    return Router;
});