define([
      "app",
      "marionette", 
      "tpl!apps/study/templates/main.tpl", 
      "apps/study/views/instructions",
      "apps/study/views/calendar",
      "tpl!apps/study/templates/studyComplete.tpl", 

      ], 
      function(App, Marionette, mainTpl, Instructions, Calendar, studyCompleteTpl){
  

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
        this.passphrase = this.model.get('adminPassphrase');
        this.safetyTriggered = options.safetyTriggered;
      },

      onAdminLogin: function(evt){
        this.$('.js-invalid-login').addClass('hidden');
        
        var password = this.$('.js-login-input').val();
        if(password != this.passphrase){
          this.$('.js-invalid-login').toggleClass('hidden');
        } else {
          App.trigger('home:show');
          this.$('.js-invalid-login').removeClass('hidden');
        }
      },

      serializeData: function(){
          return {
            safetyTriggered: this.safetyTriggered
          };
        }
    }),

    Instructions: Instructions,
    Calendar: Calendar,
  };
});
