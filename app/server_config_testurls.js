define(function(require, exports, module) {

    window.DEV_TEST_URLS = true;

    var Urls = {
        logout: "/j_spring_security_logout",
        keepAlive: "/keepAlive",
    };

    // test with local grails
    //Urls.findingSearch = "http://localhost:38080/curation_server/curation/curationElement/findingSearch";
    //Urls.findingSearch = "/curation_server/curation/curationElement/findingSearch";

    return Urls;    
});
