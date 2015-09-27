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
            yesMarijuana: '.js-yes-marijuana',
            noMarijuana: '.js-no-marijuana',
            numberOfDrinks: '.js-numberOfDrinks',
            prevDay: '.js-prev-day',
            nextDay: '.js-next-day',
            dailyMJ: '.js-daily-mj'
        },

        events: {
            'click @ui.addEvent' : 'onAddEvent',
            'click @ui.returnToCalendar' : 'onReturnToCalendar',
            'click @ui.increaseDrink' : 'onIncreaseDrink',
            'click @ui.decreaseDrink' : 'onDecreaseDrink',
            'click @ui.yesMarijuana, @ui.noMarijuana' : 'toggleMarijuanaUse',
            'click @ui.prevDay': 'navigatePrevDay',
            'click @ui.nextDay': 'navigateNextDay',
            'click @ui.dailyMJ' : 'onDailyMJ'

        },
        initialize: function(options){
            this.currentNumberOfDrinks = this.model.getNumberOfDrinks();
            this.marijuana = this.model.getMarijuanaUse();
            this.$dayEl = options.$dayEl;
            this.calendar = options.cal;
            console.log(options);
            this.startDate = options.startDate;
            this.endDate = options.endDate;
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
        onDailyMJ: function(evt){
            var events = []
            var dayNumber = 90;
            for (var m = this.startDate.subtract(1, 'days'); m.isBefore(this.endDate.clone().add(1, 'days')); this.startDate.add(1, 'days')) {                
                console.log("adding to: ", m);
                events.push({
                    date: m.clone(),
                    type: "marijuana",
                    use: true,
                    dayNumber: dayNumber                  
                });
                dayNumber--;
            }

            console.log("adding events: ", events);
            this.calendar.addEvents(events);
            
            this.model.set({
                dailyMarijuana: true,
                days: events
            });
            this.model.save(); 


        },
        onReturnToCalendar: function(evt){
            this.saveDay();
            this.trigger('close');
        },
        saveDay: function(){
            console.log("save day!");
            console.log(this.marijuana);

            this.model.set({
                marijuana: this.marijuana,
                drinks: this.currentNumberOfDrinks,
            });
            this.model.save();

            // var that=this;
            // this.calendar.removeEvents(function(event){
            //     return (event.date == that.model.get('date') && event.type != 'personal');
            // });

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
        },

        serializeData: function(){
            var data = Marionette.ItemView.prototype.serializeData.call(this);
            data.personalEvents = this.model.getPersonalEvents();
            data.dateString = moment(this.model.get('date')._i).format("dddd, MMMM Do YYYY");
            return data;
        }
   });
    return Input;
});