define(["app", "apps/study/views"], function(App, Views ){


    var displayStudyComplete = function(currentStudy, safetyTriggered){
        console.log("display study complete");
        var studyComplete = new Views.StudyComplete({
            model: currentStudy,
            safetyTriggered: safetyTriggered
        });
        mainView.contentRegion.show(studyComplete);
    };

    var displayCalendar = function(currentStudy){
        var calendar = new Views.Calendar({
            model: currentStudy
        });
        calendar.on('study:complete', function(safetyTriggered){
            displayStudyComplete(currentStudy, safetyTriggered);

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
        $('body').addClass('study');
        if(currentStudy.get('complete') === true){
            displayStudyComplete(currentStudy, currentStudy.get('safetyTriggered'));
        } else {
            displayInstructions(currentStudy);
            
            //displayCalendar(currentStudy);
        }

    };

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
        /*
        studyComplete: function(study){
            if(study){
                //displayStudyComplete(study);
                    displayStudyComplete(study);
               
            } else {
                displayStudyComplete(null);
                //TODO: redirect
            }
        },
        */
    };
});



