define(["app", "apps/study/views"], function(App, Views ){


    var displayCalendar = function(currentStudy){
        var calendar = new Views.Calendar({
            model: currentStudy
        });
        mainView.contentRegion.show(calendar);
    };

    var displayInstructions = function(){
        var instructions = new Views.Instructions();
        mainView.contentRegion.show(instructions);

        instructions.on('study:start', function(){
            displayCalendar();
        });
    };

    var display = function(currentStudy){
        mainView = new Views.Main();
        App.mainRegion.show(mainView);

       // displayInstructions();
       displayCalendar(currentStudy);

    };

    return {
        show: function(currentStudy){
            require([], function(){
                display(currentStudy);
            });
        },
    };
});



