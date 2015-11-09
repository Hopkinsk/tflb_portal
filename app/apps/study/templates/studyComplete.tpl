
<div class="header-navbar">
<nav class="navbar navbar-default no-border" role="navigation">
    <div class="container-fluid">
        <div class="js-header-brand navbar-brand no-border bch-logo col-sm-2">
        </div>       

            <div class="pull-right admin-enter">
              <button type="button" class="btn btn-default admin-enter-btn pull-right" data-toggle="modal" data-target=".bs-example-modal-sm"> Admin </button>
           </div>
    </div>
</nav>
</div>

<div class="container col-sm-6 col-sm-offset-3">
<div class="panel panel-default study-complete-panel">

		<h4 class="text-center">
     Please notify the study administrator that the study is complete. <br>
    <% if(obj.safetyTriggered){ %><span class="glyphicon glyphicon-flag"></span> <% } %> 
   </h4>
</div>


<!-- Small modal -->
<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
   
    <div class="panel panel-default">
	<div class="panel-heading">Administration Login         
		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>
	<div class="panel-body">
	<div class="js-invalid-login alert alert-danger hidden" role="alert"><strong>Error</strong> Invalid Passphrase.</div>
    <div class="input-group">
      <input type="password" class="js-login-input form-control" placeholder="Passphrase" required autofocus>
      <span class="input-group-btn">
        <button class="btn btn-default js-admin-login" type="button">Login</button>
      </span>
    </div><!-- /input-group -->
</div>
    </div>
  </div>
</div>