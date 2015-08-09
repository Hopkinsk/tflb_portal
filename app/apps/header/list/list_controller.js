define(["app", "apps/header/list/headers"], function(App, Headers){
    //App.module("HeaderApp.List", function(List, App, Backbone, Marionette, $, _){
        
    return {
        listHeader: function(){
            require(["entities/header"], function(){
                var links = App.request("header:entities");
                var headers = new Headers({collection: links});

                headers.on("brand:clicked", function(){
                    App.trigger("home:show");
                });

                headers.on("childview:navigate", function(childView, model){
                    var trigger = model.get("navigationTrigger");
                    App.trigger(trigger);
                });

                App.headerRegion.show(headers);
            });
        },

        setActiveHeader: function(headerUrl){
            require(["entities/header"], function(){                
                var links = App.request("header:entities");
                var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
                headerToSelect.select();
                links.trigger("reset");
            });                
        },

        hideHeader: function(name){
            require(["entities/header"], function(){                     
                var links = App.request("header:entities");
                link = links.where({name: name});
                if (link){
                    links.remove(link);
                }
            });                        
        }
    };
    //});

    //return App.HeaderApp.List.Controller;
});