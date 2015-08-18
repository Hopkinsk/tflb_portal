define(["app", "backbone"], function(App, Backbone){

    var Entities = App.module("Entities");

    Entities.monitorStudy = Backbone.Model.extend({
        url: Entities.urls.monitorStudy,
    });

    Entities.studyEvent = Backbone.Model.extend({
        url: Entities.urls.studyEvent

    });

    Entities.study = Backbone.Model.extend({
        url: Entities.urls.study,

        getEvents: function(){
            var events = [];
            _.each(this.get('personal'), function(evt){
                events.push(evt);
            });

            _.each(this.get('marijuana'), function(evt){
                events.push(evt);
            });

            _.each(this.get('alcohol'), function(evt){
                events.push(evt);
            });

            return events;
        }
    });

    var initializeCurrentStudy = function(data){
        Entities.currentStudy = new Entities.study(data);
    };

    var API = {
        saveStudy: function(data){
            var defer = $.Deferred();
            if(!Entities.currentStudy){
                initializeCurrentStudy(null);
            }

            Entities.currentStudy.save(
                data,
                {
                    wait: true,
                    patch: true,
                    dataType: "json",
                    success: function(model, response){
                        //set entities.currentStudy to response
                        defer.resolve(model);
                    },
                    error: function(model, xhr){
                        defer.resolve(false, xhr, model);
                    }
                }
            );

            return defer.promise();
        },

        monitorStudy: function(){
            var defer = $.Deferred();

            var monitor = new Entities.monitorStudy()
            monitor.fetch(
                {
                    wait: true,
                    patch: true,
                    dataType: "json",
                    success: function(model, response){
                        if(response.study_id != null){
                            initializeCurrentStudy(response);
                            defer.resolve(Entities.currentStudy);
                        }
                        defer.resolve(false);
                        
                    },
                    error: function(model, xhr){
                        console.log("error");
                        defer.resolve(false, xhr, model);
                    }
                }
            );

            return defer.promise();
        }


        // saveFinding: function(finding, data){

        //     var defer = $.Deferred();
        //     if(!finding){
        //         finding = new Entities.finding();
        //         if (data && data.id){
        //             finding.id = data.id;
        //         }
        //     }

        //     if (finding.saving){
        //         defer.resolve(false, { text: "Already saving this Curated Finding"} );
        //     } else {

        //         finding.saving = true;
        //         finding.save(
        //             data,
        //             {
        //                 wait: true,
        //                 patch: true,
        //                 dataType: "json",
        //                 success: function(model){
        //                     finding.saving = false;
        //                     defer.resolve(model);
        //                 },
        //                 error: function(model, xhr){
        //                     finding.saving = false;
        //                     defer.resolve(false, xhr, model);
        //                 }
        //             }
        //             );

        //         return defer.promise();
        //     }
        // },
    };



    App.reqres.setHandler("study:save", function(data){
        return API.saveStudy(data);
    });

    App.reqres.setHandler("study:monitor", function(){
        return API.monitorStudy();
    });

    return;
});
