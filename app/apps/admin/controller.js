define(["app", "apps/admin/views"], function(App, Views ){


    var display = function(studies){
        var studiesTable = new Views.StudiesTable({
            collection: studies
        });
        mainView.tableRegion.show(studiesTable);
    };

    var displayLoading = function(){
        var loading = new Views.Loading();
        mainView.tableRegion.show(loading);
    };

    return {
        show: function(){
            mainView = new Views.Main();
            App.mainRegion.show(mainView);

            require(["entities/study"], function(){
            
            displayLoading();

            $('body').addClass('study');

                //if(App.loggedIn){
                    var fetch = App.request("study:list");
                    $.when(fetch).done(function(studies, xhr){  
                        if(studies){
                            display(studies);
                        } else {
                            var error  = new Views.Error();
                            mainView.tableRegion.show(error);
                        }
                    });
                //} else {
                 //   App.trigger("home:show")
                //}
            });
        },
    };
});



