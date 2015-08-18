define(function(require, exports, module) {


	var Urls = {
		logout: "/j_spring_security_logout",
		keepAlive: "/keepAlive/monitor",
		study: function(){
			if(this.id === undefined){
				return "/study/create";
			} else {
				return "/study/update/" + encodeURIComponent(this.id);
			}

		},
		monitorStudy: function(){
        	return "/study/monitor";
        }        
	};

	return Urls;    
});





