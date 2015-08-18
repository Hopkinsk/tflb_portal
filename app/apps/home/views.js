define([
      "app",
      "marionette", 
      "entities/study",
      "tpl!apps/home/templates/main.tpl", 
      "tpl!apps/home/templates/newStudyParticipant.tpl"

      ], 
      function(App, Marionette, StudyEntity, mainTpl, newStudyParticipantTpl){
  

  return {

    Main: Marionette.LayoutView.extend({
        template: mainTpl,

        regions: {
          newStudyParticipantRegion: ".js-main-region"
        },
    }),

    newStudyParticipant: Marionette.LayoutView.extend({
       template: newStudyParticipantTpl,

       ui: {
        startStudy: '.js-start-study',
        studyIdInput: '.js-studyId-input'
       },

       events: {
        'click @ui.startStudy' : 'onStartStudy'
       },

       onStartStudy: function(evt){
          var studyId = this.ui.studyIdInput.val();
          //TODO: validate studyId


          var saveStudy = App.request("study:save", {"studyId": studyId} );
          $.when(saveStudy).done(function(study, xhr){          
            App.trigger('study:show');
          });
        }

    })


  };
});
