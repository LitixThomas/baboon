'use strict';

module.exports = function (grunt) {

    // Project configuration.
    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
            dist: ['build/dist'],
            dist2: ['build/_dist']
        },
        src: {
            build: {
                dist: 'build/dist',
                reports: 'build/reports'
            },
            client: {
                app: {
                    js: '_client/app/**/*.js',
                    html: '_client/app/**/*.js'
                },
                assets: '_client/assets',
                vendor: {
                    angular: '_client/vendor/angular',
                    bootstrap: '_client/vendor/bootstrap',
                    jquery: '_client/vendor/jquery'
                }
            },
            server : {
                api: 'server/api',
                middleware: 'server/middleware'
            }
        },
        // lint files
        jshint: {
            files: ['Gruntfile.js', 'server/server.js', 'client/app/scripts/**/*.js', 'client/test/**/*.js',
                'server/test/**/*.js', 'server/api/**/*.js'],
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
                strict: true,
                indent: 4,
                quotmark: 'single',
                es5: true,
                loopfunc: true,
                browser: true,
                node: true
            }
        },
        // copy files
        copy: {
            app: {
                files: [
                    { dest: 'build/dist/', src : '*.html', expand: true, cwd: 'client/app/' }
                ]
            },
            views: {
                files: [
                    { dest: 'build/dist/views/', src : '**', expand: true, cwd: 'client/app/views' }
                ]
            },
            assets: {
                files: [
                    { dest: 'build/dist/static/', src : '**', expand: true, cwd: 'client/assets/' }
                ]
            },
            vendor: {
                files: [
                    { dest: 'build/dist/static/css/bootstrap.css', src : 'client/vendor/bootstrap/css/bootstrap.min.css'},
                    { dest: 'build/dist/static/img/', src : '*.png', expand: true, cwd: 'client/vendor/bootstrap/img/'},
                    { dest: 'build/dist/static/js/bootstrap.js', src : 'client/vendor/bootstrap/js/bootstrap.min.js'},
                    { dest: 'build/dist/static/js/jquery.js', src : 'client/vendor/jquery/jquery.min.js'}
                ]
            },
            viewsTest: {
                files: [
                    {dest: 'build/_dist/views/', src: '**/views/*.html', expand: true, cwd:'_client/app/'}
                ]
            }
        },
        concat: {
            app: {
                src: ['client/app/scripts/app.js','client/app/common/**/*.js'],
                dest: 'build/dist/scripts/app.js'
            },
            controller: {
                src: ['client/app/scripts/**/controllers.js'],
                dest: 'build/dist/scripts/controllers.js'
            },
            directives: {
                src: ['client/app/scripts/**/directives.js'],
                dest: 'build/dist/scripts/directives.js'
            },
            filters: {
                src: ['client/app/scripts/**/filters.js'],
                dest: 'build/dist/scripts/filters.js'
            },
            services: {
                src: ['client/app/scripts/**/services.js'],
                dest: 'build/dist/scripts/services.js'
            },
            angular: {
                src: ['client/vendor/angular/angular.min.js'],
                dest: 'build/dist/static/js/angular.js'
            }
        },
        server: {
            script: 'scripts/server.js'
        },
        livereload: {
            port: 35729 // Default livereload listening port.
        },
        // Configuration to be run (and then tested)
        regarde: {
            app: {
                files: 'client/app/**/*.*',
                tasks: ['build', 'livereload']
            },
            server: {
                files: 'server/**/*.*',
                tasks: ['express-server','livereload']
            }
        },
        open: {
            server: {
                url: 'http://localhost:3000'
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


    // Tasks
    grunt.registerTask('test', ['clean:reports', 'jshint:files']);
    grunt.registerTask('build', ['clean:dist', 'copy', 'concat']);
    grunt.registerTask('relax', ['build', 'livereload-start', 'express-server', 'open:server', 'regarde' ]);

    grunt.registerTask('st', ['clean:dist2','copy:viewsTest']);

    // Default task.
    grunt.registerTask('default', ['test']);
};