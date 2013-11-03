module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'client/vendor/angular/angular.js',
            'client/vendor/angular-route/angular-route.js',
            'client/vendor/angular-mocks/angular-mocks.js',
            'client/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
            'client/vendor/angular-ui-utils/modules/**/*.js',
            'build/tmp/tpls/**/*js',
            'client/vendor/baboon-client/modules/**/*.js',
            'test/fixtures/mocks.js',
            'client/modules/*.js',
            'client/app/**/*.js',
            'client/vendor/showdown/src/showdown.js'
        ],

        exclude: [
            'client/public/**/*.js',
            'client/vendor/angular-ui-utils/modules/**/*Spec.js',
            'client/vendor/baboon-client/modules/**/*.spec.js',
            'client/modules/**/*.spec.js'
        ],

        // use dots reporter, as travis terminal does not support escaping sequences
        // possible values: 'dots', 'progress'
        // CLI --reporters progress
        reporters: ['progress', 'coverage'],

        preprocessors: {
            'client/app/**/*.js': 'coverage',
            'client/common/**/*.js': 'coverage',
            'client/toplevel/admin/**/*.js': 'coverage',
            'client/toplevel/ui_examples/**/*.js': 'coverage'
        },

        coverageReporter: {
            type: 'html',
            dir: 'build/reports/coverage/client'
        },

        // web server port
        // CLI --port 9876
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        // CLI --colors --no-colors
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // CLI --log-level debug
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // CLI --auto-watch --no-auto-watch
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari
        browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        // CLI --capture-timeout 5000
        captureTimeout: 20000,

        // Auto run tests on start (when browsers are captured) and exit
        // CLI --single-run --no-single-run
        singleRun: true,

        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 500,

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-junit-reporter'
        ]
    });
};