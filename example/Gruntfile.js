'use strict';
module.exports = function (grunt) {

    // Project configuration.
    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        conf: grunt.file.readJSON('config/app.conf.json').base,
        banner: '/*!\n' +
            ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
            ' *\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
            ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
            ' */\n\n',
        // Before generating any new files, remove any previously-created files.
        clean: {
            reports: ['build/reports'],
            dist: ['build/dist', 'build/tmp'],
            views: ['build/dist/views']
        },
        // lint files
        jshint: {
            files: ['Gruntfile.js', 'server/**/*.js', 'client/app/**/*.js', 'client/common/**/*.js',
                '!client/common/angular-*/*.*', 'test/e2e/**/*.js', 'client/tests/**/*.*', '!client/tests/lib/**/*.*'],
            junit: 'build/reports/jshint.xml',
            checkstyle: 'build/reports/jshint_checkstyle.xml',
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                regexp: true,
                undef: true,
                unused: true,
                indent: 4,
                quotmark: 'single',
                es5: true,
                loopfunc: true,
                browser: true,
                node: true,
                globals: {
                }
            }
        },

        /**
         * `grunt copy` just copies files from client or vendor to dist.
         */
        copy: {
            client: {
                // all client files that need to be copy.
                files: [
                    {dest: 'build/dist/public/', src : ['**'], expand: true, cwd: 'client/assets/'}
                ]
            },
            server: {
                // all client files that need to be copy.
                files: [
                    {dest: 'build/dist/views/', src : ['**'], expand: true, cwd: 'server/views/'}
                ]
            },
            vendor: {
                // all vendor files that need to be copy.
                files: [
                    // images from bootstrap
                    {dest: 'build/dist/public/img/', src : ['**'], expand: true, cwd: 'vendor/bootstrap/img/'}
                ]
            }
        },

        /**
         * html2js for common templates
         */

        html2js: {


            app: {
                options: {
                    // custom options, see below
                    base: 'client/app'
                },
                src: ['client/app/**/*.html'],
                dest: 'build/dist/public/js/app.tpl.js'
            },
            common: {
                options: {
                    // custom options, see below
                    base: 'client/common'
                },
                src: ['client/common/**/*.html'],
                dest: 'build/dist/public/js/common.tpl.js'
            }
        },

        /**
         * concat files
         */

        concat: {
            /**
             * The `lib` target is for all third-party js libraries we need to include
             * in the final distribution.
             */
            lib: {
                files: {
                    // lib debug
                    'build/dist/public/js/lib.js': [
                        'vendor/angular/angular.js',
                        'vendor/angular-ui-bootstrap/ui-bootstrap-tpls-0.3.0.js',
                        'vendor/angular-ui-utils/utils.js',
                        'vendor/angular-ui-utils/event/event.js',
                        'vendor/angular-ui-utils/format/format.js',
                        'vendor/angular-ui-utils/highlight/highlight.js',
//                        'vendor/angular-ui-utils/ie-shiv/ie-shiv.js',
                        'vendor/angular-ui-utils/if/if.js',
                        'vendor/angular-ui-utils/inflector/inflector.js',
                        'vendor/angular-ui-utils/jq/jq.js',
                        'vendor/angular-ui-utils/keypress/keypress.js',
                        'vendor/angular-ui-utils/mask/mask.js',
                        'vendor/angular-ui-utils/reset/reset.js',
                        'vendor/angular-ui-utils/route/route.js',
                        'vendor/angular-ui-utils/scrollfix/scrollfix.js',
                        'vendor/angular-ui-utils/showhide/showhide.js',
                        'vendor/angular-ui-utils/unique/unique.js',
                        'vendor/angular-ui-utils/validate/validate.js'

                    ],
                    // lib release
                    'build/dist/public/js/lib.min.js': [
                        'vendor/angular/angular.min.js',
                        'vendor/angular-ui-bootstrap/ui-bootstrap-tpls-0.3.0.min.js'
                        /*angular-ui-utils sind noch nicht als minimierte verfügbar*/
                    ],
                    // libs debug
                    'build/dist/public/css/lib.css': [
                        'vendor/bootstrap/css/bootstrap.css',
                        'vendor/bootstrap/css/bootstrap-responsive.css'
                    ],
                    // libs release
                    'build/dist/public/css/lib.min.css': [
                        'vendor/bootstrap/css/bootstrap.min.css',
                        'vendor/bootstrap/css/bootstrap-responsive.min.css'
                    ]
                }
            },
            /**
             * The `app` target is for application js libraries.
             */
            app: {
                files: {
                    'build/dist/public/js/app.js': [
                        'client/app/module.prefix',
                        'client/app/**/*.js',
                        '!client/app/**/*.spec.js',
                        'client/app/module.suffix'
                    ],
                    'build/dist/public/css/app.css': [
                        'client/app/**/*.css'
                    ]
                }
            },
            common: {
                files: {
                    'build/dist/public/js/common.js': [
                        'client/common/common.prefix',
                        'client/common/**/*.js',
                        '!client/common/**/*.spec.js',
                        'client/common/common.suffix'
                    ]
                }
            }
        },

        /**
         * prepare uglify with ngmin only for angular stuff
         */

        ngmin: {
            app: {
                src: ['build/dist/public/js/app.js'],
                dest: 'build/tmp/app.js'
            },
            app_tpl: {
                src: ['build/dist/public/js/app.tpl.js'],
                dest: 'build/tmp/app.tpl.js'
            },
            common: {
                src: ['build/dist/public/js/common.js'],
                dest: 'build/tmp/common.js'
            },
            common_tpl: {
                src: ['build/dist/public/js/common.tpl.js'],
                dest: 'build/tmp/common.tpl.js'
            }
        },

        /**
         * minification js files
         */

        uglify: {
            target: {
                files: {
                    'build/dist/public/js/app.min.js': 'build/tmp/app.js',
                    'build/dist/public/js/app.tpl.min.js': 'build/tmp/app.tpl.js',
                    'build/dist/public/js/common.min.js': 'build/tmp/common.js',
                    'build/dist/public/js/common.tpl.min.js': 'build/tmp/common.tpl.js'
                }
            }
        },

        /**
         * minification css files
         */

        cssmin: {
            target: {
                files: {
                    'build/dist/public/css/app.min.css': ['build/dist/public/css/app.css']
                }
            }
        },
        server: {
            script: 'app.js'
        },
        livereload: {
            port: 35729 // Default livereload listening port.
        },
        // Configuration to be run (and then tested)
        regarde: {
            client: {
                files: ['client/**/*.*', 'client/*.*', '!client/**/*.spec.js'],
                tasks: ['build:regarde', 'livereload']
            },
            server: {
                files: ['server/api/**/*.*', 'server/views/**/*.*'],
                tasks: ['clean:views', 'copy:server', 'replace:livereload', 'express-server','livereload']
            }
        },
        open: {
            browser: {
                url: '<%= conf.protocol %>://<%= conf.host %>:<%= conf.port %>'
            }
        },
        replace: {
            debug: {
                src: ['build/dist/views/*.html'],
                overwrite: true,
                replacements: [
                    {from: '<!--@@min-->', to: ''},
                    {from: '<!--@@title-->', to: '<%= conf.appName %>'},
                    {from: '<!--@@livereload-->', to: ''}
                ]
            },
            release: {
                src: ['build/dist/views/*.html'],
                overwrite: true,
                replacements: [
                    {from: '<!--@@min-->', to: '.min'},
                    {from: '<!--@@title-->', to: '<%= conf.appName %>'},
                    {from: '<!--@@livereload-->', to: ''}
                ]
            },
            livereload: {
                src: ['build/dist/views/*.html'],
                overwrite: true,
                replacements: [
                    {from: '<!--@@min-->', to: ''},
                    {from: '<!--@@title-->', to: '<%= conf.appName %>'},
                    {from: '<!--@@livereload-->', to: '<script src="<%= conf.protocol %>://<%= conf.host %>:' +
                        '<%=livereload.port%>/livereload.js?snipver=1"></script>'}
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'config/karma.conf.js'
            },
            e2e: {
                configFile: 'config/karma-e2e.conf.js'
            }
        }
    });

    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ngmin');

    // Tasks
    grunt.registerTask('build', [
        'clean:dist',
        'copy',
        'html2js',
        'concat',
        'replace:debug'
    ]);
    grunt.registerTask('build:regarde', [
        'clean:dist',
        'copy',
        'html2js',
        'concat',
        'replace:livereload'
    ]);
    grunt.registerTask('release', [
        'clean:dist',
        'copy',
        'html2js',
        'concat',
        'ngmin',
        'uglify',
        'cssmin',
        'replace:release'
    ]);
    grunt.registerTask('lint', [
        'clean:reports',
        'jshint:files'
    ]);
    grunt.registerTask('unit', [
        'clean:reports',
        'karma:unit'
    ]);
    grunt.registerTask('e2e', [
        'clean:reports',
        'build',
        'express-server',
        'karma:e2e',
        'express-server-kill'
    ]);
    grunt.registerTask('e2e:release', [
        'clean:reports',
        'release',
        'express-server',
        'karma:e2e',
        'express-server-kill'
    ]);
    grunt.registerTask('test', [
        'clean:reports',
        'jshint:files',
        'karma:unit',
        'build',
        'express-server',
        'karma:e2e',
        'express-server-kill'
    ]);
    grunt.registerTask('test:release', [
        'clean:reports',
        'jshint:files',
        'karma:unit',
        'release',
        'express-server',
        'karma:e2e',
        'express-server-kill'
    ]);
    grunt.registerTask('server', [
        'clean:dist',
        'copy',
        'html2js',
        'concat',
        'replace:livereload',
        'livereload-start',
        'express-server',
        'open',
        'regarde'
    ]);

    // Default task.
    grunt.registerTask('default', ['build']);
};