define(["app",
        "marionette",
        "tpl!apps/study/templates/instructions.tpl",
        ],
        function(App, Marionette, instructionsTpl){



    var Instructions = Marionette.LayoutView.extend({
        template: instructionsTpl,
        ui: {
            startStudy: '.js-instructions-continue',
            continueBtn: '.js-continue',
            page2: '.js-page-2',
            page1: '.js-page-1'
        },
        
        events: {
            'click @ui.continueBtn' : 'onContinue',
            'click @ui.startStudy' : 'onStartStudy'
        },
        onContinue: function(evt){
            this.ui.page2.removeClass('hidden');
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
