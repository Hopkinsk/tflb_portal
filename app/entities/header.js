define(["app", "backbone.picky"], function(App){
    App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
        Entities.Header = Backbone.Model.extend({
            initialize: function(){
                var selectable = new Backbone.Picky.Selectable(this);
                _.extend(this, selectable);
            }
        });

        Entities.HeaderCollection = Backbone.Collection.extend({
            model: Entities.Header,
            initialize: function(){
                var singleSelect = new Backbone.Picky.SingleSelect(this);
                _.extend(this, singleSelect);
            }
        });

        var initializeHeaders = function(){
            var headers = [
                { name: "Curation", url: "curation", navigationTrigger: "curation:show" },
                // { name: "Home", url: "home", navigationTrigger: "home:show" },
                //{ name: "Curated Findings", url: "curatedFindings", navigationTrigger: "curatedFindings:show" },
                //{ name: "Variant Curation", url: "variants", navigationTrigger: "variants:show" },
                //{ name: "Gene Portal", url: "geneCuration", navigationTrigger: "geneCuration:show" },    
                { name: "Admin", url: "admin", navigationTrigger: "admin:show" },
                { name: "Trial Portal", url: "trials", navigationTrigger: "trials:list" }
            ];

            // if (App.isAdmin()){
            //     headers.push({ name: "Admin", url: "admin", navigationTrigger: "admin:show" });
            //     headers.push({ name: "Trial Portal", url: "trials", navigationTrigger: "trials:list" });
            // }
            Entities.headers = new Entities.HeaderCollection(headers);
        };

        var API = {
            getHeaders: function(){
                if (Entities.headers === undefined){
                    initializeHeaders();
                }
                return Entities.headers;
            }
        };

        App.reqres.setHandler("header:entities", function(){
            return API.getHeaders();
        });
    });

    return;
});
