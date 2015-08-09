// Break out the application running from the configuration definition to
// assist with testing.
require(["config", "server_config",  "session_monitor"], function() {
    // Kick off the application.

    require(["app", "session_monitor", "apps/header/header_app"], function(App, SessionMonitor) {
        App.SessionMonitor = SessionMonitor;
        App.start();
    });
});