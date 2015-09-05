define([
      "app",
      "marionette", 
      "tpl!apps/admin/templates/main.tpl", 
      "apps/admin/views/studyTable",

      ], 
      function(App, Marionette, mainTpl, StudiesTable){
  

  return {


    Main: Marionette.LayoutView.extend({
        template: mainTpl,
        regions: {
          tableRegion: ".js-table-region"
        }
    }),

    StudiesTable: StudiesTable
  };

});
