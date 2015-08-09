<nav class="navbar navbar-inverse" role="navigation">
    <div class="container-fluid">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-target">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="js-header-brand navbar-brand" href="#home"><span class="glyphicon glyphicon-home"></span></a>        
        <div class="collapse navbar-collapse" id="navbar-collapse-target">
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
    </div>
</nav>