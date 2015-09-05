<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
        <div class="js-header-brand navbar-brand bch-logo col-sm-2">
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

