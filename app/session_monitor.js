define([
  "backbone",
  "bootstrap-dialog"
],

function(Backbone, BootstrapDialog) {

    var SessionMonitor = function(session){
        this.session = session;
        this.recordServerActivity = _.throttle(this.recordServerActivity, 5000);
        this.start();
    };

    SessionMonitor.prototype = _.extend({
        ACTIVITY_CHECK_SLEEP: 1000*60*1,
        ACTIVITY_EVENTS: "click.sessmon scroll.sessmon keypress.sessmon ckeditorChange.sessmon touchstart.sessmon",        

        start: function(){
            //console.log("Start SessionMonitor", this.session);
            if (!this.session.timeout){ this.session.timeout = 10; }
            if (!this.session.timeout_warning){ this.session.timeout_warning = 1; }
           this.SESSION_TIMEOUT = 1000*60*this.session.timeout; // in ms
           this.SESSION_TIMEOUT_WARNING = 1000*60*this.session.timeout_warning; // in ms
            

            this.recordActivity();
            this.scheduleTimeoutWarning();            
        },
        recordServerActivity: function(){
            //console.log("Server activity!");
            this.scheduleTimeoutWarning();
        },
        recordActivity: function(){
            //console.log("ACTIVITY RECORDED");
            this.lastActive = Date.now();
            this.scheduleActivityCheck();            
        },
        isActive: function(){
            var now = Date.now();
            var diff = now-this.lastActive;
            if (diff < (2*this.ACTIVITY_CHECK_SLEEP)){
                return true;
            }
            return false;
        },
        scheduleTimeoutWarning: function(){
            //console.log("Schedule timeout warning");
            if (this.scheduledWarning){ clearTimeout(this.scheduledWarning); }
            this.scheduledWarning = setTimeout(_.bind(this.warnTimeout, this), (this.SESSION_TIMEOUT - this.SESSION_TIMEOUT_WARNING));
            console.log(this.scheduledWarning);
        },
        warnTimeout: function(){
            this.scheduledWarning = null;
            //console.log("Session is going to time out soon! Do something?");

            if (this.isActive()){
               ///console.log(" - user is active: automatically extend the session");
               this.keepSessionAlive();
            } else {
                //console.log(" - user is inactive: Warn them, and schedule the logout");
                this.scheduledLogout = setTimeout(_.bind(this.doLogout, this), this.SESSION_TIMEOUT_WARNING);
                var that=this;
                BootstrapDialog.show({
                    title:"Session Timeout",
                    message: 'Your session will soon expire due to inactivity.',
                    buttons: [{
                        label: 'Remain Logged In',
                        cssClass: 'btn-primary',
                        action: function(dialogItself){
                            clearTimeout(that.scheduledLogout);
                            that.scheduledLogout = null;
                            that.keepSessionAlive();
                            dialogItself.close();
                        }
                    }, {
                        label: 'Log Out',
                        cssClass: 'btn-default',
                        action: function(dialogItself){
                            clearTimeout(that.scheduledLogout);
                            that.doLogout();
                            dialogItself.close();
                        }
                    }]
                });
            }
        },
        keepSessionAlive: function(){
            //console.log("Ping the server to keep session alive");
            this.trigger("doKeepAlive");
        },
        doLogout: function(){
            this.scheduledLogout = null;
            //console.log("doLogout event (router should handle)");
            this.trigger("doLogout", "inactivity");
        },
        scheduleActivityCheck: function(){
            if (this.scheduledCheck || this.checking){ return; }
            //console.log("Schedule activity check for later");
            this.scheduledCheck = setTimeout(_.bind(this.activityCheck, this), this.ACTIVITY_CHECK_SLEEP);
        },
        activityCheck: function(){
            this.scheduledCheck = null;
            this.checking = true;
            //console.log("Start detecting activity");
            $(window.document).on(this.ACTIVITY_EVENTS, _.bind(this.activityDetected, this));
        },
        activityDetected: function(evt){
            this.checking = false;
            $(window.document).off(this.ACTIVITY_EVENTS);            
            //console.log("Activity detected");            
            this.recordActivity();
            return true;
        }
    }, Backbone.Events);

    return SessionMonitor;
});