<!-- <div class="col-sm-12">
<span class="header-logo pull-left" title="">
  <img style="max-width:100px; margin-top: -7px;" src="app/styles/images/bch_logo.png">
</span>
</div>
 -->
 <div class="header-navbar">
<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <span class="navbar-brand" title="">
                <img style="max-width:100px; margin-top: -7px;" src="app/styles/images/bch_logo.png">
            </span>

            <div class="pull-right admin-enter">
            	<button type="button" class="btn btn-default admin-enter-btn pull-right" data-toggle="modal" data-target=".bs-example-modal-sm"> Admin</button>
       		 </div>
        </div>
    </div>
</nav>
</div>

<div class="container study-complete-panel">
<div class="col-sm-12">
<div class="panel panel-default">
<div class="panel-heading">
	Study Complete </div>
	<div class="panel-body">

		<h4 class="text-center"> Please notify the study administrator that the study is complete. </h4>
	</div>


</div>
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