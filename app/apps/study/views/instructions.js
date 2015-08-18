define(["app",
        "marionette",
        "tpl!apps/study/templates/instructions.tpl",
        ],
        function(App, Marionette, instructionsTpl){


    var Instructions = Marionette.LayoutView.extend({
        template: instructionsTpl,
        ui: {
            startStudy: '.js-instructions-continue'
        },
        
        events: {
            'click @ui.startStudy' : 'onStartStudy'

        },
        onStartStudy: function(){
            console.log("start study!");
            this.trigger('study:start');
        },
        serializeData: function(){
            // var data = Marionette.ItemView.prototype.serializeData.call(this);   
            // return data;
        }
    });


    return Instructions;

});
