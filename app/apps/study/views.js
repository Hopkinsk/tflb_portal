define(["marionette", 
      "tpl!apps/study/templates/main.tpl", 
      "apps/study/views/instructions",
      "apps/study/views/calendar"

      ], 
      function(Marionette, mainTpl, Instructions, Calendar){
  

  return {

    Main: Marionette.LayoutView.extend({
        template: mainTpl,

        regions: {
          contentRegion: ".js-content-region"
        }
    }),

    Instructions: Instructions,
    Calendar: Calendar
  };
});
