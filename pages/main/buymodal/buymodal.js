angular.module('tactical').controller('BuymodalCtrl', function ($scope , $uibModalInstance , $timeout) {
    
    console.log("BuymodalCtrl Running");

    $scope.leadFormSubmit = function () {
        console.log("ok");
    };

    $timeout(function () {

        $('#leadForm').formValidation({
            framework: 'bootstrap',
            icon: {
            valid: 'fa fa-check',
            invalid: 'fa fa-remove',
            validating: 'fa fa-refresh'
            },
            fields: {
            firstname: {
                validators: {
                    notEmpty: {
                        message: 'The First name is required'
                    },
                    stringLength: {
                        min: 1,
                        max: 30,
                        message: 'The First name must be more than 6 and less than 30 characters long. '
                    },
                    regexp: {
                        regexp: /^[a-zA-Z \.]+$/,
                        message: 'The First name can only consist of alphabetical'
                    }
                }
            },

            lastname: {
                validators: {
                    notEmpty: {
                    message: 'The Last name is required'
                    },
                    stringLength: {
                    min: 1,
                    max: 30,
                    message: 'The Last name must be more than 6 and less than 30 characters long. '
                    },
                    regexp: {
                        regexp: /^[a-zA-Z \.]+$/,
                        message: 'The Last name can only consist of alphabetical'
                    }
                }
            }, 
            
            email: {                
                validators: {
                    notEmpty: {
                        message: 'The Email is required'
                    },
                    regexp: {
                        regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                        message: 'This is not a valid email address'
                    }
                }
            }
          }
        })        
        .on('click', '.country-list', function() {
            $('#leadForm').formValidation('revalidateField', 'phoneNumber');
        });
    }, 0);


});
