define(["app", "apps/home/views"], function(App, Views ){

    var display = function(){
        var newStudy = new Views.newStudyParticipant();
        mainView.mainRegion.show(newStudy);
    };

    var login = function(){

        var login = new Views.login();
        mainView.mainRegion.show(login);
        login.on('login', function(){
            App.loggedIn = true;
            $('.nav').show();
            display();
        });
    };

    return {
        show: function(){
            mainView = new Views.Main();
            App.mainRegion.show(mainView);
            require(["entities/study"], function(){
                $('body').removeClass('study');
                $('#header-region').removeClass('hidden');
                if(App.loggedIn){
                    display();
                } else {
                    login();
                }
            });
        },
    };
});



