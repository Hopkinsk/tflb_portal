define(["app",
        "marionette",
        "clndr",
        "qtip",
        "moment",
        "tpl!apps/study/templates/calendar.tpl",
        "tpl!apps/study/templates/input.tpl",
        "tpl!apps/study/templates/instructionsCalendar.tpl",
        "text!apps/study/templates/clndr.html",
        "tpl!apps/study/templates/events.tpl",
        "tpl!apps/study/templates/event.tpl"
        ],
        function(App, Marionette, clndr, qtip, moment, calendarTpl, inputTpl, instructionsTpl, clndrTpl, eventsTpl, eventTpl ){

   var Instructions = Marionette.ItemView.extend({
        template: instructionsTpl,
        ui: {
            close: '.js-close-instructions'
        },

        events: {
            'click @ui.close' : 'onCloseView'
        },
        onCloseView: function(evt){
            this.trigger('close');
        }
   });


   var Event = Marionette.ItemView.extend({
    template: eventTpl,
    ui: {
        deleteEvent: '.js-delete-event'
    },
    events: {
        'click @ui.deleteEvent' : 'onDeleteEvent'
    },
    onDeleteEvent: function(evt){
        console.log("delete event!");
        console.log(this.model);
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
            addEvent: '.js-add-event'
        },

        events: {
            'click @ui.save' : 'onSave',
            'click @ui.addEvent' : 'onAddEvent'
        },
        childEvents: {
            'removeEvent' : 'onRemoveEvent'
        },
        initialize: function(options){
            this.calendar = options.cal;
        },
        onAddEvent: function(evt){
            console.log("ADD EVENT");
            console.log(this.model);


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


    // events view is a collection view of events with the input 
    // model is the day and collection is the personal events 
    // save personal event, triggers to collection view which saves the day with the updated titles 
    // gets a collection of study events that hit 


   var Input = Marionette.ItemView.extend({
        template: inputTpl,
        ui: {
            returnToCalendar: '.js-calendar-return',
            increaseDrink: '.js-increase-drink',
            decreaseDrink: '.js-decrease-drink',
            yesMarijuana: '.js-yes-marijuana',
            noMarijuana: '.js-no-marijuana',
            numberOfDrinks: '.js-numberOfDrinks',
            prevDay: '.js-prev-day',
            nextDay: '.js-next-day'
        },

        events: {
            'click @ui.addEvent' : 'onAddEvent',
            'click @ui.returnToCalendar' : 'onReturnToCalendar',
            'click @ui.increaseDrink' : 'onIncreaseDrink',
            'click @ui.decreaseDrink' : 'onDecreaseDrink',
            'click @ui.yesMarijuana, @ui.noMarijuana' : 'toggleMarijuanaUse',
            'click @ui.prevDay': 'navigatePrevDay',
            'click @ui.nextDay': 'navigateNextDay'

        },
        initialize: function(options){
            this.currentNumberOfDrinks = this.model.getNumberOfDrinks();
            this.marijuana = this.model.getMarijuanaUse();
            this.$dayEl = options.$dayEl;
        },
        onRender: function(){
            if(this.marijuana){
                this.ui.yesMarijuana.addClass("active");
            } else {
                this.ui.noMarijuana.addClass("active");
            }
            this.ui.numberOfDrinks.html(this.currentNumberOfDrinks);
        },
        navigatePrevDay: function(evt){
            this.$dayEl.prev('.day').click();
            this.saveDay();
        },
        navigateNextDay: function(evt){
            this.$dayEl.next('.day').click();
            this.saveDay();
        },
        onIncreaseDrink: function(evt){
            this.currentNumberOfDrinks++;
            this.numberOfDrinksChanged();
        },

        onDecreaseDrink: function(evt){
            this.currentNumberOfDrinks--;
            this.numberOfDrinksChanged();
        },
        numberOfDrinksChanged: function(){
            this.ui.numberOfDrinks.html(this.currentNumberOfDrinks);
            if(this.currentNumberOfDrinks === 0){
                this.ui.decreaseDrink.prop('disabled', true);
            } else {
                this.ui.decreaseDrink.prop('disabled', false);
            }
            if(this.currentNumberOfDrinks >= 10){
                //TODO toggle safety flag 
            }
        },
        toggleMarijuanaUse: function(evt){
            this.ui.yesMarijuana.toggleClass("active");
            this.ui.noMarijuana.toggleClass("active");
            //if true go false
            this.marijuana = !this.marijuana;
        },
        onReturnToCalendar: function(evt){
            this.saveDay();
            this.trigger('close');
        },
        saveDay: function(){

            console.log("save day!");
            console.log(this.model);
            this.model.set({
                marijuana: this.marijuana,
                drinks: this.currentNumberOfDrinks,
               // title: 
            });
            this.model.save();
           // this.trigger("day:save", this.model)
        },

        serializeData: function(){
            var data = Marionette.ItemView.prototype.serializeData.call(this);
            data.personalEvents = this.model.getPersonalEvents();
            data.dateString = moment(this.model.get('date')._i).format("dddd, MMMM Do YYYY");
            return data;
        }

   });


    var Calendar = Marionette.LayoutView.extend({
        template: calendarTpl,

        ui: {
            addEvent: '.js-add-event',
            eventMode: '.js-event-mode',
            cldnrControls: '.js-clndr-controls',
            eventControls: '.js-event-controls',
            instructionsMode: '.js-instructions',
            month: '.js-month',
            year: '.js-year',
            confirmFinish: '.js-confirm-finish'
        },

        events: {
            'click @ui.addEvent' : 'onAddEvent',
            'click @ui.eventMode' : 'onEventMode',
            'click @ui.instructionsMode' : 'onInstructionsMode',
            'click @ui.confirmFinish' : 'onFinishStudy'
        },

        regions: {
            inputRegion: '.js-input-region'
        },

        initialize: function(){
            this.cal = [];
            this.endMonth = moment().subtract(91, 'days').format('M');
            this.startMonth = moment().format('M');
            this.eventMode = false;
            this.clndrTpl = clndrTpl;
        },
        onRender: function(){
            this.generateCalendar();
            this.setAdjacentMonths(moment());


        },

        onInstructionsMode: function(evt){
            console.log("instruction mode");
            this.enableOverlay();
            this.instructionsView = new Instructions();

            this.inputRegion.show(this.instructionsView);
            

            var that=this;
            this.instructionsView.on('close', function(){
                that.instructionsView.destroy();
                that.disableOverlay();
            });  
        },

        generateCalendar: function(){
            
            var that=this;
            this.cal = this.$('.js-calendar').clndr({
                template: that.clndrTpl,
                startWithMonth: moment(),
                useTouchEvents: false,
                daysOfTheWeek: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
                showAdjacentMonths: false,
                clickEvents: {
                    click: function(target){ 
                        if(that.eventMode){
                            that.showEventInputView(target);
                        } else {
                          //  that.showEventInputView(target);
                            that.showInputView(target);
                        }
                    },
                    previousMonth: function(month){ 
                       that.onPreviousMonth(month);
                    },
                },
                extras: {
                    lastMonth: "last",
                    nextMonth: "next"
                },
                events: that.model.getEvents(),
                constraints: {
                    startDate: moment().subtract(91, 'days'), 
                    endDate: moment()
                }
            });


        },
        showEventInputView: function(day){
            this.enableOverlay();
            var dayModel = this.model.createDay(day);
            this.eventView = new Events({
                model: dayModel,
                collection: dayModel.getPersonalEventsCollection(), 
                $dayEl: $(day.element),
                cal: this.cal
            });

            this.inputRegion.show(this.eventView);
            
            var that=this;
            this.eventView.on('close', function(){
                that.eventView.destroy();
                that.disableOverlay();
            });  

        },

        showInputView: function(day){

            this.enableOverlay();
            this.inputView = new Input({
                model: this.model.createDay(day),
                $dayEl: $(day.element)
            });

            this.inputRegion.show(this.inputView);
            var that=this;
            this.inputView.on('close', function(){
                that.inputView.destroy();
                that.disableOverlay();
            });
        },
        onEventMode: function(evt){


            if(this.eventMode){
                this.eventMode = false;
                this.$('.js-clndr-controls').show();
                this.$('.js-event-instructions').toggleClass('hidden');
            } else {
                this.eventMode = true;
                this.$('.js-clndr-controls').hide();
                this.$('.js-event-instructions').toggleClass('hidden');
            }


            //correct: 
            //this.enableOverlay();
            //$('.day, .header-days, .header-day').toggleClass('event-mode');
            
        },
        toggleEventMode: function(){


        },
        enableOverlay: function(){
            if($('.js-body-overlay').length === 0){
                $('body').addClass('stop-scrolling');
                overlay = $('<div class="js-body-overlay"></div>').prependTo('body');
                overlay.addClass('disable-overlay');
            }
        },

        disableOverlay: function(){
            $('body').removeClass('stop-scrolling');
            overlay.remove();
        },
        onPreviousMonth: function(month){
            
            if(month.format('M') == this.endMonth){
                this.$('.js-finish-study, .js-previous-month').toggleClass('hidden');
                this.$('.js-next-month').toggleClass('hidden');
            } else {
                this.$('.js-finish-study').addClass('hidden');
                this.$('.js-previous-month').removeClass('hidden');
                if(month.format('M') != this.startMonth){
                    this.$('.js-next-month').toggleClass('hidden');
                } else {
                    this.$('.js-next-month').addClass('hidden');
                }
            }
            this.setAdjacentMonths(month);
        },
        setAdjacentMonths: function(month){
            console.log("ENXT");

            this.$('.js-nextMonth').html(month.add(1, "month").format('MMMM'));
            
            var last = month.subtract(2, "month");
            this.$('.js-lastMonth').html(last.format('MMMM'));
            

        },
        onAddEvent: function(evt){
            this.trigger('event:add');
        },
        onFinishStudy: function(evt){
            console.log('finish study');
    
            //TODO: save the model as complete
            this.trigger('study:complete', this.model);
        }
    });


    return Calendar;

});
