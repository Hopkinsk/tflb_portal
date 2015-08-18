<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <span class="navbar-brand" title="">
                <img style="max-width:100px; margin-top: -7px;" src="app/styles/images/bch_logo.png">
            </span>
        </div>
          <ul class="nav navbar-nav"></ul>
        <div class="user pull-right">
            <div class="info">
                <div class="name"> <%= (user.name || user.username) %></div>
                <div class="links">
                    <a class="js-logout">Log out</a>                    
                </div>
            </div>
        </div>
    </div>
</nav>