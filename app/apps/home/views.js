define([
      "app",
      "marionette", 
      "moment",
      "entities/study",
      "tpl!apps/home/templates/main.tpl", 
      "tpl!apps/home/templates/newStudyParticipant.tpl",
      "tpl!apps/home/templates/login.tpl"

      ], 
      function(App, Marionette, moment, StudyEntity, mainTpl, nspTpl, loginTpl){
  

  return {

    Main: Marionette.LayoutView.extend({
        template: mainTpl,
 
        regions: {
          mainRegion: ".js-main-region"
        },

    }),


    login: Marionette.LayoutView.extend({
        template: loginTpl,
        ui: {
          pswInput: '.js-input',
          loginBtn: '.js-login'
        },
        events: {
          'click @ui.loginBtn' : 'onLogin',
          'keyup @ui.pswInput' : 'keyPressEnter'
        },

        keyPressEnter: function(evt){
            evt.preventDefault();
            if(event.keyCode == 13){
                this.ui.loginBtn.click();
            }
        },
        onLogin: function(){
          if(this.ui.pswInput.val().toLowerCase() == 'asap'){
            this.trigger('login');
          } else {
             this.$('.js-invalid').removeClass('hidden');
             this.$('.js-invalid').html("Invalid Passcode");
          }
        }

    }),

    newStudyParticipant: Marionette.LayoutView.extend({
       template: nspTpl,

      ui: {
        startStudy: '.js-start-study',
        studyIdInput: '.js-studyId-input'
      },

       events: {
        'click @ui.startStudy' : 'onStartStudy'
       },

       onStartStudy: function(evt){
          var studyId = this.ui.studyIdInput.val();
          if(this.validStudyId()){
            var that=this;
            var saveStudy = App.request("study:save", {"studyId": studyId, "date": moment().format('MM/DD/YYYY')} );
            $.when(saveStudy).done(function(study, xhr){  
              if(study){
                App.trigger('study:show', study.get('studyId'), study.get('id'));
              } else {
                 that.$('.js-invalid').removeClass('hidden');
                 that.$('.js-invalid').html(xhr.responseText);
              }  
            });
          }
        },

        validStudyId: function(){
            var validity = true;
            var input = this.ui.studyIdInput.val();
            console.log(input.length);
            if(input.length < 4){
              console.log('lett');
                validity = false;
                 this.$('.js-invalid').removeClass('hidden');
                 this.$('.js-invalid').html("Study ID must be 4 digits.");
                 //var that = this;
                  //setTimeout(function() {
                  // that.$('.js-invalid').fadeOut();
                  // that.ui.studyIdInput.val('');
                  //}, 1000);

            }
            return validity;
          }

    })
  };
});
