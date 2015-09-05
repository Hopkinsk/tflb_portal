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
      initialize: function(){
        this.passphrase = this.model.get('adminPassphrase');
      },
      onAdminLogin: function(evt){
        this.$('.js-invalid-login').addClass('hidden');
        var password = this.$('.js-login-input').val();
        if(password != this.passphrase){
          this.$('.js-invalid-login').toggleClass('hidden');
        } else {
          this.$('.js-invalid-login').removeClass('hidden');
          App.trigger('home:show');

        }
      }
    }),

    Instructions: Instructions,
    Calendar: Calendar,
    





  };
});
