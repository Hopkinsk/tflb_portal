define(["app",
        "marionette",
        "moment",
        "tpl!apps/study/templates/input.tpl"
        ],
        function(App, Marionette, moment, inputTpl ){
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
            marijuanaBtns: '.js-marijuana-btn',
            yesMarijuana: '.js-yes-marijuana',
            noMarijuana: '.js-no-marijuana',
            numberOfDrinks: '.js-numberOfDrinks',
            prevDay: '.js-prev-day',
            nextDay: '.js-next-day',
            dailyMJCheckbox: '.js-dailyMJ-checkbox',
            dailyMJWrapper: '.js-dailyMJ-wrapper',
            dailyMJModal: '.dailyMJ-modal',
            confirmDailyMJ: '.js-dailyMJ-confirm'
        },

        events: {
            'click @ui.addEvent' : 'onAddEvent',
            'click @ui.returnToCalendar' : 'onReturnToCalendar',
            'click @ui.increaseDrink' : 'onIncreaseDrink',
            'click @ui.decreaseDrink' : 'onDecreaseDrink',
            'click @ui.yesMarijuana, @ui.noMarijuana' : 'toggleMarijuanaUse',
            'click @ui.prevDay': 'navigatePrevDay',
            'click @ui.nextDay': 'navigateNextDay',
            'click @ui.dailyMJCheckbox' : 'onSelectDailyMJ',
            'click @ui.confirmDailyMJ': 'onConfirmDailyMJ'

        },

        initialize: function(options){
            this.currentNumberOfDrinks = this.model.getNumberOfDrinks();
            this.marijuana = this.model.getMarijuanaUse();
            this.dailyMJ = options.dailyMarijuana; //TODO: change to get from model
            this.$dayEl = options.$dayEl;
            this.calendar = options.cal;
            this.startDate = options.startDate;
            this.endDate = options.endDate;
            this.modelChanged = false;
        },

        onRender: function(){
            if(this.marijuana){
                this.ui.yesMarijuana.addClass("active");
            } else {
                this.ui.noMarijuana.addClass("active");
            }
            this.toggleMarijuanaButtons(this.dailyMJ);
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
            this.modelChanged = true;
        },

        onDecreaseDrink: function(evt){
            this.currentNumberOfDrinks--;
            this.numberOfDrinksChanged();
            this.modelChanged = true;
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
            this.modelChanged = true;
            console.log("mj toggled to: ", this.marijuana);

        },

        onReturnToCalendar: function(evt){
            this.saveDay();
            this.trigger('close');
        },

        onSelectDailyMJ: function(evt){
            if(this.ui.dailyMJCheckbox.prop('checked')){
                this.ui.dailyMJModal.modal('show');
            } else {
                this.toggleMarijuanaButtons(false);
            }
        },

        onConfirmDailyMJ: function(evt){
            this.ui.noMarijuana.removeClass('active');
            this.ui.yesMarijuana.addClass('active');
            this.toggleMarijuanaButtons(true);
        },

        toggleMarijuanaButtons: function(use){
            if(use){
                this.ui.noMarijuana.addClass('disabled');
                this.ui.marijuanaBtns.prop('disabled', true);
                this.ui.dailyMJWrapper.addClass('active');
            } else {
                this.ui.noMarijuana.removeClass('disabled');
                this.ui.marijuanaBtns.prop('disabled', false);
                this.ui.dailyMJWrapper.removeClass('active');
            }
        }, 
        //todo: edge case: enter alc and daily mj same time 
        saveDay: function(){
            
            if(this.$('.js-dailyMJ-checkbox').prop('checked')){
                if(!this.dailyMJ){
                    this.changeDailyMarijuana(true);                    
                }

            } else {
                if(this.dailyMJ){
                    this.changeDailyMarijuana(false);
                    this.marijuana = false;
                }        
            }

            this.model.set({
                marijuana: this.marijuana,
                drinks: this.currentNumberOfDrinks,
            });

            if(this.modelChanged){
                this.model.save();

                var that=this;
                this.calendar.removeEvents(function(event){
                    return (event.formattedDate == that.model.get('date') && event.type != 'personal');
                });

                if(this.currentNumberOfDrinks > 0){
                    this.calendar.addEvents([{
                        date: this.model.get('date'),
                        type: "alcohol",
                        drinks: this.currentNumberOfDrinks
                    }]);    
                }
                if(this.marijuana){

                    this.calendar.addEvents([{
                        date: this.model.get('date'),
                        type: "marijuana",
                        use: this.marijuana
                    }]);     
                }             
            }


            
        },

        changeDailyMarijuana: function(use){
            if(!use){
                var that=this;
                this.calendar.removeEvents(function(event){
                    return (event.type == 'marijuana');
                });                
            }
            //if model wasnt already set to dailyMarijuana: true then do this 
            var events = [];
            var dayNumber = 90;
            var startDate = this.startDate.clone();
            for (var m = startDate; m.isBefore(this.endDate.clone().add(1, 'days')); startDate.add(1, 'days')) { 
                events.push({
                    date: m.clone(),
                    formattedDate: m.clone().format('L'),
                    type: "marijuana",
                    use: use,
                    dayNumber: dayNumber                  
                });
                dayNumber--;
            }
            this.calendar.addEvents(events);
            this.model.save({
                dailyMarijuana: use,
                days: events
            }); 
            this.trigger('changeDailyMarijuana', use);
        },



        serializeData: function(){
            var data = Marionette.ItemView.prototype.serializeData.call(this);
            data.personalEvents = this.model.getPersonalEvents();
            data.dateString = moment(this.model.get('date')._i).format("dddd, MMMM Do YYYY");
            data.dailyMJ = this.dailyMJ;
            return data;
        }
   });
    return Input;
});