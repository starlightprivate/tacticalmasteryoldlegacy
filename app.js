angular.module('tactical', ['ui.bootstrap','ui.router','ngAnimate']);

angular.module('tactical').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'pages/main/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        }).state('checkout', {
            url: '/checkout',
            templateUrl: 'pages/checkout/checkout.html',
            controller: 'CheckoutCtrl',
            controllerAs: 'co',
            params: { 'modalData': undefined }
        });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);
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
