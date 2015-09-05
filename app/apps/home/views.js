define([
      "app",
      "marionette", 
      "moment",
      "entities/study",
      "tpl!apps/home/templates/main.tpl", 
      "tpl!apps/home/templates/newStudyParticipant.tpl"

      ], 
      function(App, Marionette, moment, StudyEntity, mainTpl, newStudyParticipantTpl){
  

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
          var saveStudy = App.request("study:save", {"studyId": studyId, "date": moment().format('MM/DD/YYYY')} );
          $.when(saveStudy).done(function(study, xhr){  
            if(study){
              App.trigger('study:show', study.get('id'));
            } else {
              //TODO SHOW ERROR
            }  
          });
        }

    })


  };
});
