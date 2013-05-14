basePath = '../';

files = [
    JASMINE,
    JASMINE_ADAPTER,
    'vendor/angular/angular.js',
    'vendor/angular/angular-mocks.js',
    'test/fixtures/mocks.js',
    '../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js',
    'client/app/**/*.js'
];

//preprocessors = {
//    'client/app/**/*.js': 'coverage'
//};

reporters = ['progress'];

//coverageReporter = {
//    type : 'html',
//    dir : 'build/reports/coverage'
//};

browsers = ['Chrome'];

singleRun = false;