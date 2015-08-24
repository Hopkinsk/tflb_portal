define(function(require, exports, module) {


	var Urls = {
		logout: "/j_spring_security_logout",
		keepAlive: "/keepAlive/monitor",
		study: function(){
			return "/study/" + encodeURIComponent(this.id);
		},
		monitorStudy: function(){
			return "/study/monitor";
		},
		studyDay: function(){
			return "/day/" + encodeURIComponent(this.id);
		}        
	};

	return Urls;    
});





