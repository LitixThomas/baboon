/*global angular*/
window.baboon = {};
angular.module('app', ['templates-app', 'ui.bootstrap', 'lx.directives', 'app.services',
        'ui_examples', 'blog', 'enterprise', 'home'])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.otherwise({redirectTo: '/'});
    });
