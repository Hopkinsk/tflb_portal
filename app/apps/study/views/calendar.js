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
            decreaseDrink: '.js-decrease-drink'
        },

        events: {
            'click @ui.addEvent' : 'onAddEvent',
            'click @ui.returnToCalendar' : 'onReturnToCalendar',
            'click @ui.increaseDrink' : 'onIncreaseDrink',
            'click @ui.decreaseDrink' : 'onDecreaseDrink'
        },

        onIncreaseDrink: function(evt){

        },

        onDecreaseDrink: function(evt){

        },

        onReturnToCalendar: function(evt){
            this.trigger('close');
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
                            _that.showInputView(target.date);
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
        showInputView: function(date){
            this.enableOverlay();
            this.inputView = new Input({

            });
            this.inputRegion.show(this.inputView);

            var that=this;
            this.inputView.on('close', function(){
                that.inputView.destroy();
                that.disableOverlay();
            });
        },

        enableOverlay: function(){
            $('body').addClass('stop-scrolling');
            overlay = $('<div></div>').prependTo('body');
            overlay.addClass('disable-overlay');
        },

        disableOverlay: function(){
            $('body').removeClass('stop-scrolling');
            overlay.remove();
        },

        onAddEvent: function(evt){
            this.trigger('event:add');
        },

        serializeData: function(){
            return {
                month: this.cal.month,
                days: this.cal.days,
                daysOfTheWeek: this.cal.daysOfTheWeek,
                intervalStart: this.cal.intervalStart
            };
        }
    });


    return Calendar;

});
