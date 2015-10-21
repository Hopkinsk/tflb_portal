define(["app",
        "marionette",
        "tpl!apps/study/templates/instructions.tpl",
        ],
        function(App, Marionette, instructionsTpl){



    var Instructions = Marionette.LayoutView.extend({
        template: instructionsTpl,
        ui: {
            startStudy: '.js-instructions-continue',
            continue1Btn: '.js-continue-1',
            continue2Btn: '.js-continue-2',
            page1: '.js-page-1',
            page2: '.js-page-2',
            page3: '.js-page-3'
        },
        
        events: {
            'click @ui.continue1Btn' : 'onContinue1',
            'click @ui.continue2Btn' : 'onContinue2',
            'click @ui.startStudy' : 'onStartStudy'
        },
        onContinue1: function(evt){
            this.ui.page2.removeClass('hidden');
            this.ui.page1.addClass('hidden');
        },
        onContinue2: function(evt){
            this.ui.page3.removeClass('hidden');
            this.ui.page2.addClass('hidden');
            this.ui.page1.addClass('hidden');
        },
        onStartStudy: function(evt){
            this.trigger('study:start');
        },
        serializeData: function(){
            // var data = Marionette.ItemView.prototype.serializeData.call(this);   
            // return data;
        }
    });


    return Instructions;

});
