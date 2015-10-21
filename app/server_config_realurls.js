define(function(require, exports, module) {


	var Urls = {
		logout: "/j_spring_security_logout",
		keepAlive: "/keepAlive/monitor",
		study: function(){
			return "/study/" + encodeURIComponent(this.id);
		},
		studyDay: function(){
			return "/day/" + encodeURIComponent(this.id);
		},
		personalEvent: function(){
			return "/event/" + encodeURIComponent(this.id);
		},
		studyList: function(){
			return "/study/list";
		},
		studySafetyTrigger: function(){
            return "/study/"+ encodeURIComponent(this.id)+"/safety";
        },
		exportStudies: function(){

			return "/study/export";
		}        
	};

	return Urls;    
});





