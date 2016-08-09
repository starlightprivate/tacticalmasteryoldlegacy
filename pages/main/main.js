angular.module('tactical').controller('MainCtrl',function($scope, $uibModal){
    var vm = this;

    vm.showLeadForm = function() {
        $uibModal.open({
            templateUrl: 'pages/main/buymodal/buymodal.html',
            controller: 'BuymodalCtrl'
        }).result.then(function(result){
            //do something with the result
        });
    };
});
