angular.module('tactical', ['ui.bootstrap','ui.router','ngAnimate']);

angular.module('tactical').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'pages/main/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/');

});

angular.module('tactical').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
