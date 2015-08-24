define(["app", "apps/home/views"], function(App, Views ){


    var display = function(){
        mainView = new Views.Main();
        App.mainRegion.show(mainView);

        var newStudy = new Views.newStudyParticipant();
        mainView.newStudyParticipantRegion.show(newStudy);

    };

    return {
        show: function(){
            require(["entities/study"], function(){
                display();

                // var monitor = App.request("study:monitor");
                // $.when(monitor).done(function(currentStudy, xhr){  
                //     if(currentStudy){
                //         App.trigger('study:show', currentStudy);
                //     } else {
                //         display();
                //     }
                // });
            });
        },
    };
});



