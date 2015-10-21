define(["app",
        "marionette",
        "clndr",
        "qtip",
        "moment",
        "tpl!apps/study/templates/calendar.tpl",
        "tpl!apps/study/templates/instructionsCalendar.tpl",
        "text!apps/study/templates/clndr.html",
        "apps/study/views/events",
        "apps/study/views/input"
        ],
        function(App, Marionette, clndr, qtip, moment, calendarTpl, instructionsTpl, clndrTpl, Events, Input){

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


    var Calendar = Marionette.LayoutView.extend({
        template: calendarTpl,

        ui: {
            eventMode: '.js-event-mode',
            cldnrControls: '.js-clndr-controls',
            eventControls: '.js-event-controls',
            instructionsMode: '.js-instructions',
            month: '.js-month',
            year: '.js-year',
            confirmFinish: '.js-confirm-finish'
        },

        events: {
            'click @ui.eventMode' : 'onEventMode',
            'click @ui.instructionsMode' : 'onInstructionsMode',
            'click @ui.confirmFinish' : 'onFinishStudy'
        },

        regions: {
            inputRegion: '.js-input-region'
        },

        initialize: function(){
            this.cal = [];
            this.endMonth = moment(this.model.get('date'), "MM-DD-YYYY").subtract(89, 'days').format('M');
            this.startMonth = moment(this.model.get('date'), "MM-DD-YYYY").format('M');
            this.startDate =  moment(this.model.get('date'), "MM-DD-YYYY").subtract(89, 'days');
            this.endDate = moment(this.model.get('date'), "MM-DD-YYYY");
            this.eventMode = false;
            this.clndrTpl = clndrTpl;
            this.dailyMJ = this.model.get('dailyMarijuana');
            console.log("setting daily Mj!");
        },

        onRender: function(){
            this.generateCalendar();
            this.setAdjacentMonths(moment());
            this.setDailyMarijuana();
        },

        setDailyMarijuana: function(){
            if(this.dailyMJ){
                var events = [];
                var dayNumber = 90;
                var startDate = this.startDate.clone();
                for (var m = startDate; m.isBefore(this.endDate.clone().add(1, 'days')); startDate.add(1, 'days')) { 
                    events.push({
                        date: m.clone(),
                        formattedDate: m.clone().format('L'),
                        type: "marijuana",
                        use: true,
                        dayNumber: dayNumber                  
                    });
                    dayNumber--;
                }
                this.cal.addEvents(events);
            }
        },

        onInstructionsMode: function(evt){
            this.enableOverlay();
            this.instructionsView = new Instructions();
            this.inputRegion.show(this.instructionsView);
            

            var that=this;
            this.instructionsView.on('close', function(){
                that.instructionsView.destroy();
                that.disableOverlay();
            });  
        },

        onEventMode: function(evt){

            if(this.eventMode){
                this.eventMode = false;
                $('body').removeClass('event-mode');
                this.$('.js-event-mode-header').addClass('hidden');
                this.$('.js-cal-mode-header').removeClass('hidden');
                this.$('.event-personal-label, .marijuana-icon, .alcohol-icon').removeClass('event-mode');

            } else {
                this.eventMode = true;
                $('body').addClass('event-mode');
                this.$('.js-event-mode-header').removeClass('hidden');
                this.$('.js-cal-mode-header').addClass('hidden');
                this.$('.event-personal-label, .marijuana-icon, .alcohol-icon').addClass('event-mode');
            }
        },
        generateCalendar: function(){
            
            var that=this;
            this.cal = this.$('.js-calendar').clndr({
                template: that.clndrTpl,
                startWithMonth: moment(that.model.get('date'), "MM-DD-YYYY"), //that.startDate, //moment(),
                useTouchEvents: false,
                daysOfTheWeek: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
                showAdjacentMonths: false,
                clickEvents: {
                    click: function(target){ 
                        if(that.eventMode){
                            that.showEventInputView(target);
                        } else {
                           // that.showEventInputView(target);
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
                doneRendering: function(){ 
                     console.log("render calendar!");
                    if(that.eventMode){
                        $('body').addClass('event-mode');
                        that.$('.js-event-mode-header').removeClass('hidden');
                        that.$('.js-cal-mode-header').addClass('hidden');
                        that.$('.event-personal-label, .marijuana-icon, .alcohol-icon').addClass('event-mode');
                    }
                },
                events: that.model.getEvents(),
                constraints: {
                    startDate: that.startDate.clone(), 
                    endDate: that.endDate.clone()
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
                that.eventMode = false;
                $('body').removeClass('event-mode');
                that.$('.js-event-mode-header').addClass('hidden');
                that.$('.js-cal-mode-header').removeClass('hidden');
                that.$('.event-personal-label, .marijuana-icon, .alcohol-icon').removeClass('event-mode');

            });  

        },

        showInputView: function(day){
            this.enableOverlay();
            this.inputView = new Input({
                model: this.model.createDay(day),
                $dayEl: $(day.element),
                cal: this.cal,
                startDate: this.startDate.clone(),
                endDate: this.endDate.clone(),
                dailyMarijuana: this.dailyMJ
            });


            this.inputRegion.show(this.inputView);
            var that=this;
            this.inputView.on('changeDailyMarijuana', function(use){
                that.model.set({
                    dailyMarijuana: use
                });
                that.dailyMJ = use;
            });

            this.inputView.on('close', function(){
                that.inputView.destroy();
                that.disableOverlay();
            });

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
            this.$('.js-nextMonth').html(month.add(1, "month").format('MMMM'));
            var last = month.subtract(2, "month");
            this.$('.js-lastMonth').html(last.format('MMMM'));
        },

        onAddEvent: function(evt){
            this.trigger('event:add');
        },

        onFinishStudy: function(evt){
            var that=this;
            this.model.save({"studyComplete": true},{
                patch: true,
                success: function(model){
                    that.trigger('study:complete', model.get('safetyTriggered'));
                },
                error: function(){
                    console.log("ERROR !!!");
                }
            });

            /*
            //TODO: save the model as complete
            var that=this;
            var studyComplete = this.model.getSafetyTrigger();
            $.when(safetyTriggered).done(function(safetyTrigger, xhr){ 
                that.trigger('study:complete', this.model);
            });
            */
            //App.trigger("study:complete", this.model);
          
        }
    });


    return Calendar;

});
