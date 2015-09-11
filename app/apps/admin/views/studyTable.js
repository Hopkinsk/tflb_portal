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

            //this.trigger('studycontinue', this.model);
            console.log("GOING TO TRIGGER");
            App.trigger('study:show', this.model.get('id'));
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
            console.log(ids);

            // $.fileDownload(, {
            //     httpMethod: "GET",
            //     data: strData
            //     successCallback: function (responseHtml, url) {
            //         $preparingFileModal.dialog('close');
            //         // In this case 
            //         $.fileDownload("/pdf/"+responseHtml, {
            //             preparingMessageHtml: "Download file",
            //             failMessageHtml: "Not work"
            //         });

            //     },
            //     failCallback: function (responseHtml, url) {
            //         $preparingFileModal.dialog('close');
            //         $("#error-modal").dialog({ modal: true });
            //     }
            // });

            var fetch = App.request("studies:export", ids);
            $.when(fetch).done(function(file, xhr){  
                console.log("DONE");
                console.log(file);
            });

        },
        
        serializeData: function(){
            // var data = Marionette.ItemView.prototype.serializeData.call(this);   
            // return data;
        }
    });


    return Table;

});