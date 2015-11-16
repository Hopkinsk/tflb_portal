module.exports = function(grunt) {
    "use strict";
     var rootRel = "/"
    grunt.initConfig({
        // Wipe out previous builds and test reporting.
       // clean: ["dist/", "dist_bundle/", "test/reports"],

        clean: ["dist/", "dist_bundle/", "app/styles/index_compiled.css", "index_compiled.html", "index_compiled.gsp"],

        // The jshint task will run the build configuration and the application
        // JavaScript through JSHint and report any errors.
        // https://github.com/gruntjs/grunt-contrib-jshint
        jshint: {
          all: [ "app/**/*.js"],
          changed: []
        },

        // The watch task can be used to monitor the filesystem and execute
        // specific tasks when files are modified.
        // (run this in background, 'bbb watch')    
        watch: {
            options: {
                spawn: false,
                interval: 1000
            },
            // css: {
            //     files: "app/styles/*.less",
            //     tasks: ["less","styles","cssmin"]
            // },

            css: {
                files: ["static/css/*.less", "static/css/index.css"],
                tasks: ["less","cssmin"]
            },

            js: {
                files: "<%=jshint.all%>",
                tasks: ["jshint:changed"]
            }
        },

        // This task uses James Burke's excellent r.js AMD builder to take all
        // modules and concatenate them into a single file.
        requirejs: {
            release: {
                options: {
                    mainConfigFile: "app/config.js",
                    generateSourceMaps: true,
                    include: ["main"],
                    insertRequire: ["main"],
                    out: "dist/source.min.js",
                    optimize: "uglify2",

                    // Since we bootstrap with nested `require` calls this option allows
                    // R.js to find them.
                    findNestedDependencies: true,

                    // Include a minimal AMD implementation shim.
                    name: "almond",

                    // Setting the base url to the distribution directory allows the
                    // Uglify minification process to correctly map paths for Source
                    // Maps.
                    baseUrl: "dist/app",

                    // Wrap everything in an IIFE.
                    wrap: false, // avoid undefined being passed as require result in production

                    // Do not preserve any license comments when working with source
                    // maps.  These options are incompatible.
                    preserveLicenseComments: false
                }
            }
        },

        // Compile Less to CSS
        less: {
            compile: {
                options: {
                    paths: ["static/css", /*"app/styles",*/ "vendor/bower/bootstrap/less"]
                },
                files: {
                    //"app/styles/index_compiled.css": "app/styles/index.less"
                    "static/css/index_compiled.css": "static/css/index.less"
                }
            }
        },


        // This task simplifies working with CSS inside Backbone Boilerplate
        // projects.  Instead of manually specifying your stylesheets inside the
        // HTML, you can use `@imports` and this task will concatenate only those
        // paths.


        // styles: {
        //     // Out the concatenated contents of the following styles into the below
        //     // development file path.
        //     "dist/css/styles.css": {
        //         // Point this to where your `index.css` file is location.
        //        // src: "app/styles/index.css",
        //         src: "static/css/index.css",

        //         // The relative path to use for the @imports.
        //        // paths: ["app/styles"],

        //         paths: ["static/css"],
        //         // Rewrite image paths during release to be relative to the specified directory.
        //         // comment out to disable: url() in styles already relative and should be kept the same                
        //        // forceRelative: "/app/styles/images/"
        //        forceRelative: "static/images/"
        //     }
        // },






        // Minfiy the distribution CSS.
        // cssmin: {
        //     release: {
        //         files: {
        //             "dist/css/styles.min.css": ["dist/css/styles.css"]
        //         }
        //     }
        // },




        cssmin: {
          all: {
            files: {
              "dist/css/index.css": [                     
                "static/css/index_compiled.css"
              ]   
            }
          } 
        },


        server: {
            options: {
                host: "0.0.0.0",
                port: 8000
            },

            development: {
                options: {
                    port: 9000,
                     files: "<%=server.files%>",

                }
            },


            release: {
                options: {
                    prefix: "dist"
                }
            },

            test: {
                options: {
                    forever: false,
                    port: 8001
                }
            }
        },

        processhtml: {
            release: {
                files: {
                    "dist/index.html": ["index.html"]
                }
            }
        },

        // Move vendor and app logic during a build.
        copy: {
            release: {
                files: [
                    {
                        src: ["app/**"],
                        dest: "dist/"
                    },
                    {
                        src: "vendor/**",
                        dest: "dist/"
                    },
                    // {
                    //     expand: true,
                    //     cwd: "app/styles/fonts/",
                    //     src: "**",
                    //     dest: "dist/css/fonts/"
                    // },
                    // {
                    //     expand: true,
                    //     cwd: "app/styles/images/",
                    //     src: "**",
                    //     dest: "dist/css/images/"
                    // },     
                    {
                        expand: true,
                        cwd: "static/css/",
                        src: "**",
                        dest: "dist/css/"
                    },

                    {
                        expand: true,
                        cwd: "static/css/fonts/",
                        src: "**",
                        dest: "dist/css/fonts/"
                    },

                    {
                        expand: true,
                        cwd: "static/images/",
                        src: "**",
                        dest: "dist/images/"
                    },
                    {
                        src: ["index.gsp"],
                        dest: "dist/"
                    }
                ]
            },
            release_bundle: {
                files: [
                    // {                    
                    //     src: "dist/index.html",
                    //     dest: "dist_bundle/index.gsp"
                    // },
                    {
                        src: "dist/index.gsp",
                        dest: "dist_bundle/index.gsp"
                    },
                    // {                    
                    //     src: "dist/css/styles.min.css",
                    //     dest: "dist_bundle/css/styles.min.css"
                    // },                                                           
                    // {
                    //     expand: true,
                    //     cwd: "dist/css/fonts/",
                    //     src: "**",
                    //     dest: "dist_bundle/css/fonts/"
                    // },                                                           
                    // {
                    //     expand: true,
                    //     cwd: "dist/css/images/",
                    //     src: "**",
                    //     dest: "dist_bundle/css/images/"
                    // },

                    // {
                    //     src: "dist/css/index_compiled.css",
                    //     dest: "dist_bundle/css/index_compiled.css"
                    // },
                    {
                        expand: true,              
                        cwd: "dist/css/",
                        src: ["index.css"],                
                        dest: "dist_bundle/css/"
                    },
                    /* JUST NOW
                    {
                        expand: true,
                        cwd: "dist/css/fonts/",
                        src: "**",
                        dest: "dist_bundle/css/fonts/"
                    },
                    */

                    {
                        expand: true,
                        cwd: "dist/images/",
                        src: "**",
                        dest: "dist_bundle/images/"
                    },


                ]              
            },
            release_bundle2: {
                files: [  
                    {                    
                        src: "dist/source.min.js",
                        dest: "dist_bundle/js/source.min.js"
                    },
                    {                    
                        src: "dist/source.min.js.map",
                        dest: "dist_bundle/js/source.min.js.map"
                    }
                ],
                options: {
                    process: function (content, srcpath) {

                        return content.replace(/\/\/\# sourceMappingURL=source\.min\.js\.map/,"");
                    }
                }                
            }
        },

        compress: {
            release: {
                options: {
                    archive: "dist/source.min.js.gz"
                },

                files: ["dist/source.min.js"]
            }
        },

        // Unit testing is provided by Karma.  Change the two commented locations
        // below to either: mocha, jasmine, or qunit.
        karma: {
            options: {
                basePath: process.cwd(),
                singleRun: true,
                captureTimeout: 7000,
                autoWatch: true,

                reporters: ["progress", "coverage"],
                browsers: ["PhantomJS"],

                // Change this to the framework you want to use.
                frameworks: ["mocha"],

                plugins: [
          "karma-jasmine",
          "karma-mocha",
          "karma-qunit",
          "karma-phantomjs-launcher",
          "karma-coverage"
        ],

                preprocessors: {
                    "app/**/*.js": "coverage"
                },

                coverageReporter: {
                    type: "lcov",
                    dir: "test/coverage"
                },

                files: [
          // You can optionally remove this or swap out for a different expect.
          "vendor/bower/chai/chai.js",
          "vendor/bower/requirejs/require.js",
          "test/runner.js",

                    {
                        pattern: "app/**/*.*",
                        included: false
                    },
          // Derives test framework from Karma configuration.
                    {
                        pattern: "test/<%= karma.options.frameworks[0] %>/**/*.spec.js",
                        included: false
          },
                    {
                        pattern: "vendor/**/*.js",
                        included: false
                    }
        ]
            },

            // This creates a server that will automatically run your tests when you
            // save a file and display results in the terminal.
            daemon: {
                options: {
                    singleRun: false
                }
            },

            // This is useful for running the tests just once.
            run: {
                options: {
                    singleRun: true
                }
            }
        },

        coveralls: {
            options: {
                coverage_dir: "test/coverage/PhantomJS 1.9.2 (Linux)/"
            }
        }
    });

    // Grunt contribution tasks.
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks('grunt-contrib-watch');    
    grunt.loadNpmTasks('grunt-contrib-less');     

    // Third-party tasks.
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks("grunt-karma-coveralls");
    grunt.loadNpmTasks("grunt-processhtml");

    // Grunt BBB tasks.
    grunt.loadNpmTasks("grunt-bbb-server");
    grunt.loadNpmTasks("grunt-bbb-requirejs");
    grunt.loadNpmTasks("grunt-bbb-styles");

    // on watch events configure jshint to only run on changed file
    grunt.event.on('watch', function(action, filepath) {
        grunt.config('jshint.changed', filepath);
    });
    
    // Create an aliased test task.
    grunt.registerTask("test", ["karma:run"]);

    // When running the default Grunt command, just lint the code.
    grunt.registerTask("default", [
    "clean",
    "jshint",
    "processhtml",
    "copy:release",
    "requirejs",
    "less",
   //"styles",
    "cssmin",
    "copy:release_bundle",
    "copy:release_bundle2"
  ]);
};