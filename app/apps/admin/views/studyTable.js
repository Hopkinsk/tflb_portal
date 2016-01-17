define(["app",
        "marionette",
        "jquery-file-download",
        "tpl!apps/admin/templates/table.tpl",
        "tpl!apps/admin/templates/row.tpl",
        "tpl!apps/admin/templates/emptyRow.tpl",
        ],
        function(App, Marionette, jqd, tableTpl, rowTpl, emptyRowTpl){


    var Row = Marionette.ItemView.extend({
        tagName: "tr",
        template: rowTpl,
        ui: {
            continueStudy: '.js-continue-study'
        },
        
        events: {
            'click @ui.continueStudy' : 'onContinueStudy'
        },

        onContinueStudy: function(evt){
            App.trigger('study:show', this.model.get('studyId'), this.model.get('id'));
        },

        isSelected: function(){
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
        childEvents: {

        },
        onSelectAll: function(evt){
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
            
            var ids = [];
            this.children.each(function(child){
                if(child.isSelected()){
                    ids.push(child.model.get('id'));
                }
            });    

            var url = "/study/export?ids="+ encodeURIComponent(JSON.stringify(ids));
            $.fileDownload(url, {
                successCallback: function (url) {
             
                    alert('You just got a file download dialog or ribbon for this URL :' + url);
                },
                failCallback: function (html, url) {
             
                    alert('Your file download just failed for this URL:' + url + '\r\n' +
                            'Here was the resulting error HTML: \r\n' + html
                            );
                }
            });
        },
        
        serializeData: function(){
            // var data = Marionette.ItemView.prototype.serializeData.call(this);   
            // return data;
        }
    });


    return Table;

});