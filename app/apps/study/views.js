define([
      "app",
      "marionette", 
      "tpl!apps/study/templates/main.tpl", 
      "apps/study/views/instructions",
      "apps/study/views/calendar",
      "tpl!apps/study/templates/studyComplete.tpl", 
      "tpl!apps/study/templates/studyDoesNotExist.tpl", 
      ], 
      function(App, Marionette, mainTpl, Instructions, Calendar, studyCompleteTpl, errorTpl){
  

  return {

    Main: Marionette.LayoutView.extend({
        template: mainTpl,

        regions: {
          contentRegion: ".js-content-region"
        }
    }),

    StudyComplete: Marionette.LayoutView.extend({
      template: studyCompleteTpl,
      
      ui: {
        adminBtn: '.js-admin-login',
        loginInput: '.js-login-input'
      },

      events: {
        'click @ui.adminBtn' : 'onAdminLogin',
        'keyup @ui.loginInput' : 'keyPressEnter'
      },



      initialize: function(options){
        /* STATICALLY SET PASSWORD TO ENTER SITE */
        this.passphrase = 'asap';
        this.safetyTriggered = options.safetyTriggered;
      },

      keyPressEnter: function(evt){
        evt.preventDefault();
        if(event.keyCode == 13){
            this.ui.adminBtn.click();
        }
      },

      onAdminLogin: function(evt){
        this.$('.js-invalid-login').addClass('hidden');
        var password = this.ui.loginInput.val();
        if(password != this.passphrase){
          this.$('.js-invalid-login').removeClass('hidden');
        } else {
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
          App.loggedIn = true;
          App.trigger('home:show');
        }
      },
      serializeData: function(){
          return {
            safetyTriggered: this.safetyTriggered
          };
        }
    }),

    StudyDoesNotExist: Marionette.LayoutView.extend({
        template: errorTpl,
        events: {
          'click .js-home' : 'onReturnHome'
        },
        onReturnHome: function(){
          App.trigger('home:show');
        }
    }),

    Instructions: Instructions,
    Calendar: Calendar,
  };
});
