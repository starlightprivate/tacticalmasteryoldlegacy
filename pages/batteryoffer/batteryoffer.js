angular.module('tactical').controller('BatteryOfferCtrl', ['$scope','$state','$stateParams','$timeout', function ($scope ,$state, $stateParams, $timeout ) {
 
    console.log("BatteryOfferCtrl Running", $stateParams.modalData);
    
    $scope.doUpsellYes = function (productId, itemPrice) {
        var usParams = {};
        usParams['orderId'] = window.myOrderID;
        usParams['productQty'] = 1;
        var nextPage = '/tacticalsales/receipt.html?orderId=' + window.myOrderID;

    };
    
}]);
