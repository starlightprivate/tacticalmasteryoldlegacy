angular.module('tactical').controller('BatteryOfferCtrl', ['$scope','$state','$stateParams','$timeout', function ($scope ,$state, $stateParams, $timeout ) {
 
    console.log("BatteryOfferCtrl Running", $stateParams.orderData);

    var orderData = {"dateCreated":"2016-08-16 15:54:37","f_address1":"aas wewe wrewr 21","f_city":"NY","f_name":"Shahjada","f_emailAddress":"par@test.com","f_phoneNumber":"3343343333","orderId":"CD814E6B80","f_postalCode":"12312","initialProductId":"6"}
    
    $scope.doUpsellYes = function (productId, itemPrice) {
        var usParams = {};
        usParams['orderId'] = window.myOrderID;
        usParams['productQty'] = 1;
        //var nextPage = '/tacticalsales/receipt.html?orderId=' + window.myOrderID;

        ga('send', 'event', 'Purchase', 'Upsell (Battery)', 'conversion value', itemPrice || 0);
        productId = productId || '12';
        nextPage = '/tacticalsales/us_headlampoffer.html?orderId=' + window.myOrderID;

    };

    $scope.doUpsellNo = function () {
        var nextPage = '/tacticalsales/receipt.html?orderId=' + window.myOrderID;
        
        document.location = nextPage;
    };
    
}]);
