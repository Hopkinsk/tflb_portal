
require([
"app",
        // Remote server setup:
        // Comment out one of the below (avoids bloating the built version)

       //"server_config_testurls"
    "server_config_realurls"

        ], function(App, Urls){

        var Entities = App.module("Entities");
        Entities.urls = Urls;
});
