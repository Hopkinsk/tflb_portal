define([
      "app",
      "marionette", 
      "tpl!apps/admin/templates/main.tpl", 
      "apps/admin/views/studyTable",
      "tpl!apps/admin/templates/passphrase.tpl", 


      ], 
      function(App, Marionette, mainTpl, StudiesTable, passphraseTpl){
  

  return {


    Main: Marionette.LayoutView.extend({
        template: mainTpl,
        regions: {
          tableRegion: ".js-table-region"
        }
    }),

    StudiesTable: StudiesTable,



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
