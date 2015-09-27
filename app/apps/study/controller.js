define(["app", "apps/study/views"], function(App, Views ){


    var displayStudyComplete = function(currentStudy){
        console.log("display study complete");
        console.log(currentStudy);

        var studyComplete = new Views.StudyComplete({
            model: currentStudy
        });

        mainView.contentRegion.show(studyComplete);
    };

    var displayCalendar = function(currentStudy){
        var calendar = new Views.Calendar({
            model: currentStudy
        });

        mainView.contentRegion.show(calendar);
    };

    var displayInstructions = function(currentStudy){
        mainView = new Views.Main();
        App.mainRegion.show(mainView);


        var instructions = new Views.Instructions();
        mainView.contentRegion.show(instructions);

        instructions.on('study:start', function(){
            displayCalendar(currentStudy);
        });
    };

    var display = function(currentStudy){
        mainView = new Views.Main();
        App.mainRegion.show(mainView);

       //displayInstructions(currentStudy);
        $('body').addClass('study');
        displayCalendar(currentStudy);
      // displayStudyComplete(currentStudy);

    };

    // var displayInstructions = function(currentStudy){
    //     mainView = new Views.Main();
    //     App.mainRegion.show(mainView);
    // };

    return {
        show: function(studyId){
            $('#header-region').addClass('hidden');
            require(["entities/study"], function(){
                  var fetchStudy = App.request("study:show", studyId );
                  $.when(fetchStudy).done(function(currentStudy, xhr){          
                   display(currentStudy);

                   //displayInstructions(currentStudy);
                  });
            });
        },
        studyComplete: function(study){
            if(study){
                //displayStudyComplete(study);
                displayStudyComplete(study);

            } else {
                displayStudyComplete(null);

                //TODO: redirect
            }
        },

    };
});



