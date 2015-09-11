define(["app", "apps/admin/views"], function(App, Views ){


    var display = function(studies){
        mainView = new Views.Main();
        App.mainRegion.show(mainView);

        $('body').addClass('study');

        
        var studiesTable = new Views.StudiesTable({
            collection: studies
        });
        mainView.tableRegion.show(studiesTable);


        // var passphrase = new Views.Passphrase({
        //     model: 
        // });
    };

    return {
        show: function(){
            require(["entities/study"], function(){


                display();

                var fetch = App.request("study:list");
                $.when(fetch).done(function(studies, xhr){  
                    if(studies){
                        display(studies);
                    } else {
                        //display error msg
                    }
                });
            });
        },
    };
});



