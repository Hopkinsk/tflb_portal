define(["app",
        "marionette",
        "tpl!apps/admin/templates/table.tpl",
        "tpl!apps/admin/templates/row.tpl",
        "tpl!apps/admin/templates/emptyRow.tpl",
        ],
        function(App, Marionette, tableTpl, rowTpl, emptyRowTpl){


    var Row = Marionette.ItemView.extend({
        tagName: "tr",
        template: rowTpl,
        ui: {
        },
        
        events: {
            'click @ui.startStudy' : 'onStartStudy'
        },

        isSelected: function(){
            console.log(this.$("[type=checkbox]"));
            if(this.$("[type=checkbox]").is(":checked")){
                return true;
            }
            return false;
        },

        serializeData: function(){
            var data = Marionette.ItemView.prototype.serializeData.call(this);   
            return data;
        }
    });

    var emptyTable = Marionette.ItemView.extend({
        tagName: "tr",
         template: emptyRowTpl,
    });

    var Table = Marionette.CompositeView.extend({
        childView: Row,
        emptyView: emptyTable,
        childViewContainer: '.js-rows',
        template: tableTpl,
        ui: {
            selectAll: '.js-select-all',
            exportSelected: '.js-export-selected',
            deleteSelected: '.js-delete-selected'
        },
        
        events: {
            'click @ui.selectAll' : 'onSelectAll',
            'click @ui.exportSelected' : 'onExport',
            'click @ui.deleteSelected' : 'onDelete'
        },

        onSelectAll: function(evt){
            console.log($(event.target).is(":checked"));
                if($(evt.target).is(":checked")) { // check select status
                    $("[type=checkbox]").each(function() { //loop through each checkbox
                        this.checked = true;  //select all checkboxes with class "checkbox1"               
                    });
                }else{
                    $("[type=checkbox]").each(function() { //loop through each checkbox
                        this.checked = false; //deselect all checkboxes with class "checkbox1"                       
                    });       
                }  
        },

        onDelete: function(){
            this.children.each(function(child){
                if(child.isSelected()){
                    child.model.destroy();
                }
            });
        },

        onExport: function(){
            


        },
        
        serializeData: function(){
            // var data = Marionette.ItemView.prototype.serializeData.call(this);   
            // return data;
        }
    });


    return Table;

});