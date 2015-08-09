define(["app",
        "marionette",
        "tpl!apps/header/list/templates/list.tpl",
         "tpl!apps/header/list/templates/list_item.tpl"
        ],
        function(App, Marionette,listTpl, listItemTpl){

    var Header = Marionette.ItemView.extend({
        template: listItemTpl,
        tagName: "li",

        events: {
            "click a.js-nav-link": "navigate",
        },

        navigate: function(e){
            e.preventDefault();
            this.trigger("navigate", this.model);
        },

        onRender: function(){
            if(this.model.selected){
                // add class to highlight the active entry in the navbar
                this.$el.addClass("active");
            }
        },
    });

    var Headers = Marionette.CompositeView.extend({
        template: listTpl,
        className: "header-navbar",
        childView: Header,
        childViewContainer: "ul",

        events: {
            "click a.js-header-brand": "brandClicked",
            "click a.js-logout": "onLogOut"
        },

        brandClicked: function(e){
            e.preventDefault();
            this.trigger("brand:clicked");
        },
        onLogOut: function(e){
            App.goLogout();
        },
        serializeData: function(){
            var user = {};
            if(App.getCurrentUser()){
                user = App.getCurrentUser();
            }
            return {
                user: user
            };
        }
    });

    return Headers;

});
