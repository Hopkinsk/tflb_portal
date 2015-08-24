define(["app", "backbone", "moment"], function(App, Backbone, moment){

    var Entities = App.module("Entities");

    Entities.monitorStudy = Backbone.Model.extend({
        url: Entities.urls.monitorStudy,
    });

    Entities.studyEvent = Backbone.Model.extend({
        url: Entities.urls.studyEvent
    });

    Entities.Day = Backbone.Model.extend({
        url: Entities.urls.studyDay,

       getNumberOfDrinks: function(){
            var drinks = 0;
            _.each(this.attributes.events, function(evt){
                if(evt.type == "alcohol"){
                    drinks = evt.drinks;
                }
            });
            return drinks;
       },

       getMarijuanaUse: function(){
            var used = false;
            _.each(this.attributes.events, function(evt){
                console.log(evt);
                if(evt.type == "marijuana"){
                    used = true;
                }
            });
            return used;
       },

       getPersonalEvents: function(){
            var events = [];
            _.each(this.events, function(evt){
                if(evt.type == "personal"){
                    events.push(evt.title);
                }
            });
            return events;
       }
    });

    Entities.Events = Backbone.Collection.extend({
        url: Entities.urls.events
    });

    Entities.study = Backbone.Model.extend({
        url: Entities.urls.study,


        createDay: function(data){
            console.log("create day");

            data.date = moment(data.date).format('L');
            data.study_id = this.id;
            data.dayNumber = 5;
            return new Entities.Day(data);
        },

        getEvents: function(){
            //var events = new Entities.Events();
            var events = [];
            _.each(this.get('personal'), function(evt){
                events.push(evt);
               // events.add(evt);
            });

            _.each(this.get('marijuana'), function(evt){
                events.push(evt);
               // events.add(evt);
            });

            _.each(this.get('alcohol'), function(evt){
                events.push(evt);
                //events.add(evt);
            });

            return events;
        }
    });


    var API = {
        saveStudy: function(data){
            var defer = $.Deferred();
            var study = new Entities.study(data);
            study.save(
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

        getStudy: function(id){
            var defer = $.Deferred();
            var study = new Entities.study({id: id});
            study.fetch(
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

    App.reqres.setHandler("study:show", function(id){
        return API.getStudy(id);
    });

    App.reqres.setHandler("study:save", function(data){
        return API.saveStudy(data);
    });

    return;
});
