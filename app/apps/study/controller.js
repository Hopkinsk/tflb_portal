define(["app", "apps/study/views"], function(App, Views ){


    var displayStudyComplete = function(currentStudy, safetyTriggered){
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
        var instructions = new Views.Instructions();
        mainView.contentRegion.show(instructions);

        instructions.on('study:start', function(){
            displayCalendar(currentStudy);
        });
    };

    var display = function(currentStudy){
        App.loggedIn = false;
        $('body').addClass('study');
        if(currentStudy.get('complete') === true){
            displayStudyComplete(currentStudy, currentStudy.get('safetyTriggered'));
        } else {
            displayInstructions(currentStudy);
        }

    };

    return {
        show: function(studyId){
            mainView = new Views.Main();
            App.mainRegion.show(mainView);
            $('#header-region').addClass('hidden');
            require(["entities/study"], function(){
              var fetchStudy = App.request("study:show", studyId );
              $.when(fetchStudy).done(function(currentStudy, xhr){   
                    if(currentStudy){
                        display(currentStudy);
                    } else {
                        $('body').addClass('study');
                        mainView.contentRegion.show(new Views.StudyDoesNotExist());
                    }     
                });
            });
        }
    };
});



