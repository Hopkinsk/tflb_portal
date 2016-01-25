
require([
	"app",
    //"server_config_testurls"		// Uncomment for testUrls (test environment)
    "server_config_realurls"		// Uncomment for realUrls (production environment)

    ], function(App, Urls){
    	var Entities = App.module("Entities");
    	Entities.urls = Urls;
    });
