define(["app",
        "marionette",
        "clndr",
        "moment",
        "tpl!apps/study/templates/calendar.tpl",
        "tpl!apps/study/templates/input.tpl",
        "text!apps/study/templates/clndr.html"
        ],
        function(App, Marionette, clndr, moment, calendarTpl, inputTpl, clndrTpl){

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
            eventControls: '.js-event-controls'
        },

        events: {
            'click @ui.addEvent' : 'onAddEvent',
            'click @ui.eventMode' : 'onEventMode'
        },

        regions: {
            inputRegion: '.js-input-region'
        },

        initialize: function(){
            this.cal = [];
            this.endMonth = moment().subtract(91, 'days').format('M');
            this.eventMode = false;
            this.clndrTpl = clndrTpl;
        },
        onRender: function(){
            this.generateCalendar();
        },
        generateCalendar: function(){
            
            var that=this;
            this.cal = this.$('.js-calendar').clndr({
                template: that.clndrTpl,
                startWithMonth: moment(),
                useTouchEvents: false,
                daysOfTheWeek: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
                clickEvents: {
                    click: function(target){ 
                        if(this.eventMode){
                            that.showEventInputView(target);
                        } else {
                            that.showInputView(target);
                        }
                    },
                    previousMonth: function(month){ 
                       that.onPreviousMonth(month);
                    },
                },
                events: that.model.getEvents(),
                constraints: {
                    startDate: moment().subtract(91, 'days'), 
                    endDate: moment()
                }
            });

        },
        showEventInputView: function(day){
            console.log("SHOW EVENT INPUT VIEW");
            console.log("show event input view");

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
            this.enableOverlay();
            $('.day, .header-days, .header-day').toggleClass('event-mode');
            
            this.eventMode = true;
            this.$('.js-clndr-controls').hide();
            this.$('.js-event-controls').show();
            
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
            } else {
                this.$('.js-finish-study').addClass('hidden');
                this.$('.js-previous-month').removeClass('hidden');
            }
        },
        onAddEvent: function(evt){
            this.trigger('event:add');
        }
    });


    return Calendar;

});
