define(function(require, exports, module) {

    window.DEV_TEST_URLS = true;

    var Urls = {
        logout: "/j_spring_security_logout",
        keepAlive: "/keepAlive",

        study: function(){
             return "/app/mockdata/study/" + encodeURIComponent(this.id) + ".json";
        },
        monitorStudy: function(){
        	return "/app/mockdata/monitor/currentStudy.json";
        }
    };

    return Urls;    
});
