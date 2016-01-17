define([
      "app",
      "marionette", 
      "tpl!apps/admin/templates/main.tpl", 
      "apps/admin/views/studyTable",
      "tpl!apps/admin/templates/passphrase.tpl", 
      "tpl!apps/admin/templates/loading.tpl", 
      "tpl!apps/admin/templates/error.tpl", 
      ], 
      function(App, Marionette, mainTpl, StudiesTable, passphraseTpl, loadingTpl, errorTpl){
  

  return {


    Main: Marionette.LayoutView.extend({
        template: mainTpl,
        regions: {
          tableRegion: ".js-table-region"
        }
    }),

    StudiesTable: StudiesTable,

    Loading: Marionette.ItemView.extend({
      template: loadingTpl
    }),

    Error: Marionette.ItemView.extend({
      template: errorTpl
    }),

    Passphrase: Marionette.ItemView.extend({
      template: passphraseTpl,
      events: {
        'click .js-edit' : 'onToggleEdit'
      },
      initialize: function(){
        this.passphrase = this.model.get('adminPassphrase');

      },

      onToggleEdit: function(){



      },

      onAdminLogin: function(evt){

      },

      serializeData: function(){
          return {
            passphrase: this.passphrase
          };
        }
    }),
  };

});
