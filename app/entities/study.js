define(["app", "backbone", "moment"], function(App, Backbone, moment){

    var Entities = App.module("Entities");

    Entities.monitorStudy = Backbone.Model.extend({
        url: Entities.urls.monitorStudy,
    });

    Entities.personalEvent = Backbone.Model.extend({
        url: Entities.urls.personalEvent,
        getUrlPath: function(){
            return '/';
        }
    });

    Entities.personalEvents = Backbone.Collection.extend({
        url: Entities.urls.personalEvent,
        model: Entities.personalEvent

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
                if(evt.type == "marijuana"){
                    used = true;
                }
            });
            return used;
       },

       getPersonalEvents: function(){
            var events = [];
            _.each(this.attributes.events, function(evt){
                if(evt.type == "personal"){
                    events.push(evt.title);
                }
            });
            return events;
       },
       getPersonalEventsCollection: function(){
            var personal = [];
            var that=this;
            _.each(this.attributes.events, function(evt){
                if(evt.type == "personal"){
                    personal.push(evt);
                }
            });
            return new Entities.personalEvents(personal);
       }
    });

    Entities.Events = Backbone.Collection.extend({
        url: Entities.urls.events
    });

    Entities.study = Backbone.Model.extend({
        url: Entities.urls.study,


        createDay: function(data){
            data.date = moment(data.date).format('L');
            data.study_id = this.id;
            var diff = moment(data.date).diff(this.get('date'), 'days');
            diff = Math.abs(diff) + 1;
            data.dayNumber = diff;
            return new Entities.Day(data);
        },

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
        },

        getSafetyStatus: function(){
            var triggered = false;
            _.each(this.get('alcohol'), function(evt){
                if(evt.drinks > 9){
                    triggered = true;
                }
            }); 

            return triggered;
        }
    });

    Entities.csvExport = Backbone.Model.extend({
        url: Entities.urls.exportStudies

    });

    Entities.studyListItem = Backbone.Model.extend({
        url: Entities.urls.study
    });

    Entities.studyList = Backbone.Collection.extend({
        model: Entities.studyListItem,
        url: Entities.urls.studyList
    });


    var API = {
        getStudies: function(){
            var defer = $.Deferred();
            var studyList = new Entities.studyList();
            studyList.fetch(
                {
                    wait: true,
                    patch: true,
                    dataType: "json",
                    success: function(collection, response){
                        //set entities.currentStudy to response
                        defer.resolve(collection);
                    },
                    error: function(model, xhr){
                        defer.resolve(false, xhr, model);
                    }
                }
            );

            return defer.promise();
        },

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
        exportStudies: function(ids){
            var defer = $.Deferred();
            var study = new Entities.csvExport();
            

              $.ajax({
                 type: 'GET',
                 data:{ids: JSON.stringify(ids)},
                 datatype: 'json',
                 url: study.url(),
                 async: true,
                 cache: false,
                 success: function(response){

                    console.log("SUCCESS AJAX");
                    console.log(response);
                    defer.resolve(response);
                 }
                });

            // study.fetch(
            //     {
            //         wait: true,
            //         data: {
            //             ids: JSON.stringify(ids),
            //         },
            //         success: function(model, response){
            //             //set entities.currentStudy to response
            //             defer.resolve(model);
            //         },
            //         error: function(model, xhr){
            //             defer.resolve(false, xhr, model);
            //         }
            //     }
            // );

            return defer.promise();


        }
    };

    App.reqres.setHandler("study:list", function(){
        return API.getStudies();
    });

    App.reqres.setHandler("study:show", function(id){
        return API.getStudy(id);
    });

    App.reqres.setHandler("study:save", function(data){
        return API.saveStudy(data);
    });

    App.reqres.setHandler("studies:export", function(data){
        return API.exportStudies(data);
    });

    return;
});
