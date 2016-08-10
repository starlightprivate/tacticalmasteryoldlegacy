angular.module('tactical').controller('MainCtrl',function($scope, $uibModal){
    var vm = this;
    
    vm.animationsEnabled = true;

    vm.showLeadForm = function () {

        $uibModal.open({
            templateUrl: 'pages/main/buymodal/buymodal.html',
            controller: 'BuymodalCtrl',
            animation: vm.animationsEnabled
        }).result.then(function (result) {
            //do something with the result
        });

    };

});
