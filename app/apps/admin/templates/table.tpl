<div class="col-sm-12">
<div class="panel panel-default ">

<div class="panel-heading">
<h4> Participants </h4> 

</div>

<table class="table table-bordered table-striped">
    <thead>
        <tr class="table-headers">
        	<th class="table-header" ><input type="checkbox" class="js-select-all"> </th>
        	<th class="table-header" >Participant ID</th>
        	<th class="table-header" >Study Date </th>
        	<th class="table-header" >Status</th>
        </tr>
    </thead>
    <tbody class="js-rows table-body">
    </tbody>
</table>

</div>
<button class="btn btn-default js-export-selected pull-right" > Export Selected </button>

<button type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#myModal">
Delete Selected
</button>
</div>




<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Confirm Delete</h4>
      </div>
      <div class="modal-body">
        Are you sure you want to delete the selected studies from the database? 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary js-delete-selected" data-dismiss="modal">Yes, Delete Studies.</button>
      </div>
    </div>
  </div>
</div>