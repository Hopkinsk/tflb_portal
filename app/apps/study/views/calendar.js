define(["app",
        "marionette",
        "clndr",
        "moment",
        "tpl!apps/study/templates/calendar.tpl",
        "tpl!apps/study/templates/input.tpl"
        ],
        function(App, Marionette, clndr, moment, calendarTpl, inputTpl){

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
            this.$dayEl = options.$dayEl;
        },
        onRender: function(){
            if(this.model.getMarijuanaUse()){
                this.ui.yesMarijuana.addClass("active");
            } else {
                this.ui.noMarijuana.addClass("active");
            }
            this.ui.numberOfDrinks.html(this.currentNumberOfDrinks);
        },
        navigatePrevDay: function(evt){
            this.$dayEl.prev('.day').click();
        },
        navigateNextDay: function(evt){
            this.$dayEl.next('.day').click();
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
            if(this.currentNumberOfDrinks == 0){
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
        },
        onReturnToCalendar: function(evt){
            this.saveInput();
            this.trigger('close');
        },
        saveInput: function(){


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
            addEvent: '.js-add-event'
        },

        events: {
            'click @ui.addEvent' : 'onAddEvent'
        },

        regions: {
            inputRegion: '.js-input-region'
        },

        initialize: function(){
            this.cal = [];
            this.generateCalendar();
            console.log("month", moment().subtract(91, 'days').format('M'));
            this.endMonth = moment().subtract(91, 'days').format('M');


        },
        generateCalendar: function(){
            var that=this;
            $.get('app/apps/study/templates/clndr.html', function(clndrTpl) {
                var _that = that;
                that.cal = $('.js-calendar').clndr({
                    template: clndrTpl,
                    startWithMonth: moment(),
                    useTouchEvents: false,
                    daysOfTheWeek: ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'],
                    clickEvents: {
                        click: function(target){ 
                            _that.showInputView(target);
                        },
                        previousMonth: function(month){ 
                            _that.onPreviousMonth(month);
                        },
                    },
                    events: _that.model.getEvents(),
                    constraints: {
                        startDate: moment().subtract(91, 'days'), 
                        endDate: moment()
                    }
                });
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

        enableOverlay: function(){
            if($('.js-body-overlay').length == 0){
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
