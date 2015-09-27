define(["app",
        "marionette",
        "moment",
        "tpl!apps/study/templates/events.tpl",
        "tpl!apps/study/templates/event.tpl"
        ],
        function(App, Marionette, moment, eventsTpl, eventTpl ){

   var Event = Marionette.ItemView.extend({
    tagName: 'li',
    className: 'event-list-item',
    template: eventTpl,
    ui: {
        deleteEvent: '.js-delete-event'
    },
    events: {
        'click @ui.deleteEvent' : 'onDeleteEvent'
    },
    onDeleteEvent: function(evt){
        this.trigger('removeEvent');
        this.model.destroy();

    },
    serializeData: function(){
        var data = Marionette.ItemView.prototype.serializeData.call(this);
        console.log("serializing event");
        console.log(data);
        return data;
    }
   });


    var Events = Marionette.CompositeView.extend({
        template: eventsTpl,
        childView: Event,
        childViewContainer: '.js-events-list',
        ui: {
            save: '.js-save',
            eventInput: '.js-event-input',
            addEvent: '.js-add-event',
            
        },

        events: {
            'click @ui.save' : 'onSave',
            'click @ui.addEvent' : 'onAddEvent',
            
        },

        childEvents: {
            'removeEvent' : 'onRemoveEvent'
        },
        initialize: function(options){
            console.log("init events");
            this.calendar = options.cal;
            this.eventsToAdd = [];
            this.eventsToRemove = [];
        },
        onAddEvent: function(evt){
            this.collection.create({
                title: this.ui.eventInput.val(),
                date: this.model.get('date'),
                type: "personal",
                study_id: this.model.get('study_id')
            });

            this.calendar.addEvents([{
                date: this.model.get('date'),
                type: "personal",
                title: this.ui.eventInput.val()
            }]);

            this.ui.eventInput.val("");
        },

        onRemoveEvent: function(child){
            this.EventToDelete = child.model;
            var that=this;
            this.calendar.removeEvents(function(event){
                return (event.date == that.EventToDelete.get('date') && event.title == that.EventToDelete.get('title'));
            });
        },

        onSave: function(evt){            
            this.trigger('close');
        },

        createEventsForCalendar: function(){
            var events = [];
            var that=this;
            this.collection.each(function(evt){
                if(evt.get('added')){
                      events.push({
                        date: that.model.get('date'),
                        type: "personal",
                        title: evt.get('title')
                    });                  
                  }
            });
            return events;
        },

        createTitleArray: function(){
            var titles = [];
            this.collection.each(function(model){
                titles.push(model.get('title'));
            });
            return titles;
        },

        serializeData: function(){
            var data = Marionette.ItemView.prototype.serializeData.call(this);
            data.dateString = moment(this.model.get('date')._i).format("dddd, MMMM Do YYYY");
            return data;
        }

    });

    return Events;
});