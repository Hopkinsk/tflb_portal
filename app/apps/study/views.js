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
      events: {
        'click .js-admin-login' : 'onAdminLogin'
      },

      initialize: function(options){
        this.passphrase = 'asap';//this.model.get('adminPassphrase');
        this.safetyTriggered = options.safetyTriggered;
      },

      onAdminLogin: function(evt){
        this.$('.js-invalid-login').addClass('hidden');
        
        var password = this.$('.js-login-input').val();
        if(password != this.passphrase){
          this.$('.js-invalid-login').removeClass('hidden');
        } else {
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
