<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <title>Curation</title>

    <!-- Application styles. -->
    <!-- <link rel="stylesheet" href="styles.min.css"> -->

 <!-- Application styles. -->
  <r:require module="style1"/> 
  <r:layoutResources/>
  

    <!-- Logged in -->
     <!--  <script>          
        window.server_session = {
            timeout: 30,
            timeout_warning: 5,
            csrf: "<sec:loggedInUserInfo field='csrf'/>",
            user: { 
              username: "<sec:username/>",
              name: "<sec:username/>",
              id: "<sec:loggedInUserInfo field='id'/>"
            } 
        };        
      </script> -->

</head>




<body>
    <div id="header-region"></div>

    <div class="container-fluid">
        <!-- Application container. -->
        <main role="main" id="main-region"></main>
    </div>

<!--[if lt IE 9]>
    <div style="margin: 30px">
        <p>Apologies, but your browser is currently unsupported by this website.</p>
        <p>Please visit this website with a modern browser such as Chrome, Internet Explorer 10 or 11, Firefox or Safari.</p>    
    </div>
<![endif]-->
<!--[if gte IE 9]><!-->

    <!-- Application source. -->
  <script data-main="/app/main" src="${resource(dir: 'js', file: 'source.min.js')}"></script>

<!--<![endif]-->
</body>

</html>