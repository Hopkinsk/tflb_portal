define(["app",
        "marionette",
        "moment",
        "tpl!apps/study/templates/input.tpl"
        ],
        function(App, Marionette, moment, inputTpl ){

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
            confirmDailyMJ: '.js-dailyMJ-confirm',
            denyDailyMJ: '.js-dailyMJ-deny'
        },

        events: {
            'click @ui.addEvent' : 'onAddEvent',
            'click @ui.returnToCalendar' : 'onReturnToCalendar',
            'click @ui.increaseDrink' : 'onIncreaseDrink',
            'click @ui.decreaseDrink' : 'onDecreaseDrink',
            'click @ui.yesMarijuana' : 'yesMjUse',
            'click  @ui.noMarijuana' : 'noMjUse',
            'click @ui.prevDay': 'navigatePrevDay',
            'click @ui.nextDay': 'navigateNextDay',
            'click @ui.dailyMJCheckbox' : 'onSelectDailyMJ',
            'click @ui.confirmDailyMJ': 'onConfirmDailyMJ',
            'click @ui.denyDailyMJ' : 'onDenyDailyMJ'
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
            this.toggleMarijuanaButtons(this.dailyMJ);
            if(this.marijuana){
                this.ui.yesMarijuana.addClass("active");
                this.ui.noMarijuana.removeClass('active');
            } else {
                this.ui.noMarijuana.addClass("active");
                this.ui.yesMarijuana.removeClass('active');
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
            this.modelChanged = true;
        },

        onDecreaseDrink: function(evt){
            if(this.currentNumberOfDrinks !== 0){
                this.currentNumberOfDrinks--;
            }
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


        noMjUse: function(evt){
            this.ui.noMarijuana.addClass('active');
            this.ui.yesMarijuana.removeClass('active');
            this.marijuana = false;
            this.modelChanged = true;
        },
        yesMjUse: function(){
            this.ui.noMarijuana.removeClass('active');
            this.ui.yesMarijuana.addClass('active');
            this.marijuana = true;
            this.modelChanged = true;
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
                this.marijuana = false;
            }
        },

        onConfirmDailyMJ: function(evt){
            this.ui.noMarijuana.removeClass('active');
            this.ui.yesMarijuana.addClass('active');
            this.toggleMarijuanaButtons(true);
        },

        onDenyDailyMJ: function(){
             this.ui.dailyMJCheckbox.attr('checked', false);

        },

        toggleMarijuanaButtons: function(use){
            console.log('toggle!', use);
            if(use){
                this.ui.dailyMJWrapper.addClass('active');
            } else {
                this.ui.noMarijuana.addClass('active');
                this.ui.yesMarijuana.removeClass('active');
                this.ui.dailyMJWrapper.removeClass('active');
            }
        }, 

        saveDay: function(){
            console.log("SAVE DAY", this.marijuana);
            this.model.set({
                marijuana: this.marijuana,
                drinks: this.currentNumberOfDrinks,
            });



            //check daily mj
            if(this.$('.js-dailyMJ-checkbox').prop('checked')){
                if(!this.dailyMJ){
                    this.changeDailyMarijuana(true);                    
                }

            //uncheck daily mj
            } else {
                if(this.dailyMJ){
                    this.changeDailyMarijuana(false);
                    if(this.marijuana){
                        this.calendar.addEvents([{
                            date: this.model.get('date'),
                            type: "marijuana",
                            use: this.marijuana
                        }]);     
                    } 
                }
            } 


            if(this.modelChanged){
                this.model.save();

                var that=this;
                this.calendar.removeEvents(function(event){
                    var date = event.formattedDate || event.date;
                    return (date == that.model.get('date') && event.type != 'personal');
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
            data.dateString = moment(this.model.get('date')).format("dddd, MMMM Do YYYY");
            data.dailyMJ = this.dailyMJ;
            return data;
        }
   });
    return Input;
});