//angular.module('tactical').controller('BuymodalCtrl', function ($scope, $uibModalInstance, $timeout) {
angular.module('tactical').controller('BuymodalCtrl', ['$scope','$rootScope', '$state','$timeout', function ($scope ,$rootScope, $state, $timeout ) {

    console.log("BuymodalCtrl Running");

    $scope.formData = {
        fullname: '',
        email: '',
        phoneNumber : ''
    };

    $scope.formValidationDivClass = {
        fullname: '',
        email: '',
        phoneNumber: ''
    };

    $scope.formValidationControlClass = {
        fullname: '',
        email: '',
        phoneNumber: ''
    };

    function validateEmail(email) {
        //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return re.test(email);
    }

    var showValidationError = function (field) {
        $scope.formValidationDivClass[field] = "has-danger";
        $scope.formValidationControlClass[field] = "form-control-danger";
        $scope.disableSubmitButton = true;
    };

    var showValidationSuccees = function (field) {
        $scope.formValidationDivClass[field] = "has-success";
        $scope.formValidationControlClass[field] = "form-control-success";
    };


    $scope.inputChanged = function (field) {//has-success form-control-success has-danger form-control-danger


        // if (!$scope.formData[field] || $scope.formData[field] === "") {
        //     $scope.formValidationDivClass[field] = "has-danger";
        //     $scope.formValidationControlClass[field] = "form-control-danger";
        //     return;
        // } else if ((field === "phoneNumber" && $scope.formData[field].length < 10) || (field !== "phoneNumber" && $scope.formData[field].length < 5)) {
        //     $scope.formValidationDivClass[field] = "has-danger";
        //     $scope.formValidationControlClass[field] = "form-control-danger";
        //     return;
        // }
        // else {
        //     $scope.formValidationDivClass[field] = "has-success";
        //     $scope.formValidationControlClass[field] = "form-control-success";
        // }



        switch (field) {
            case "fullname":
                if (!$scope.formData.fullname || $scope.formData.fullname === "" || $scope.formData.fullname.length < 5) {
                    showValidationError(field);
                    return;
                } else {
                    showValidationSuccees(field);
                }
                break;
            case "email":
                if (!$scope.formData.email || $scope.formData.email === "" || $scope.formData.email.length < 5) {
                    showValidationError(field);
                    return;
                } else {
                    if (validateEmail($scope.formData.email)) {
                        showValidationSuccees(field);
                    } else {
                        showValidationError(field);
                    }
                }
                break;
                
            case "phoneNumber":
                if (!$scope.formData.phoneNumber || $scope.formData.phoneNumber === "" || $scope.formData.phoneNumber.length < 10) {
                    showValidationError(field);
                    return;
                } else {
                    showValidationSuccees(field);
                }
                break;
        }

        console.log("asasas");

        if (checkvalidation2()) {
            $scope.disableSubmitButton = false;
        } else {
            $scope.disableSubmitButton = true;
        }
    };

    var checkvalidation2 = function () {
        if ($scope.formData.fullname.length >= 5 && validateEmail($scope.formData.email) && $scope.formData.phoneNumber.length > 9) {
            return true;
        } else {
            return false;
        }
    };

    $scope.formValidationState = {
        fullname: undefined,
        email: undefined,
        phoneNumber: undefined
    };

    $scope.disableSubmitButton = true;
    
    $scope.submitLeadForm = function (e) {
        console.log(e);
        if (checkvalidation2()) {
            // Do Proper Logic Stuffs
            $rootScope.modalData = $scope.formData;
            $('#myModal').modal('hide');
            setTimeout(function() {
                $state.go('checkout', { modalData: $scope.formData });
            }, 411);
            //return true;
            
        } else {
            console.log("Not Okay");
            return false;
        }
        
    };

    $timeout(function () {
        $('input[name=phoneNumber]').mask('000-000-0000', { 'translation': { 0: { pattern: /[0-9*-]/ } } });
    }, 0);
    
}]);
