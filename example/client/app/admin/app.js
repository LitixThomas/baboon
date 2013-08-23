/*global angular*/
angular.module('baboon.admin', [
        'ui.utils',
        'ui.bootstrap',
        'pascalprecht.translate',
        'baboon.services',
        'baboon.directives',
        'ui.lxnavigation',
        'aadmin'
    ])
    .config(['$routeProvider', '$locationProvider', '$translateProvider', function ($routeProvider, $locationProvider, $translateProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.when('/admin', {templateUrl: '/admin/index.html'});
        $routeProvider.otherwise({redirectTo: '/admin'});

        $translateProvider.useStaticFilesLoader({
            prefix: 'locale/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');
    }])
    .run(['$rootScope', 'session', '$log', '$translate', function ($rootScope, session, $log, $translate) {
        $rootScope.$on('$routeChangeStart', function () {
            session.setActivity();
        });

        // get users preferred language from session
        session.getData('language', function (error, result) {
            if (error) {
                $log.error(error);
            }

            // use language
            if (result && result.language) {
                $translate.uses(result.language);
                $log.info('Language key loaded from session: ' + result.language);
            }
        });
    }])
    .controller('rootCtrl', ['$rootScope', 'msgBox', function ($scope, msgBox) {
        $scope.modal = msgBox.modal;
    }]);