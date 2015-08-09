define(["app", "apps/header/list/list_controller"], function(App, ListController){
    App.module("HeaderApp", function(Header, App, Backbone, Marionette, $, _){
        var API = {
            listHeader: function(){
                ListController.listHeader();
            },
            hideHeader: function(name){
                ListController.hideHeader(name);
            }      
        };

        App.commands.setHandler("set:active:header", function(name){
            ListController.setActiveHeader(name);
        });
        App.commands.setHandler("hide:header", function(name){
            ListController.hideHeader(name);
        });    

        Header.on("start", function(){
            API.listHeader();
        });
    });

    return App.HeaderApp;
});