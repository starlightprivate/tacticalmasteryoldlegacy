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
            return false
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
            $state.go('checkout', { modalData: $scope.formData });
            //return true;
            
        } else {
            console.log("Not Okay");
            return false;
        }
        
    };
    
    $timeout(function () {

        var isFormDirty = false;

        // Define new validator
        window.FormValidation.Validator.intPhoneNumber = {
            html5Attributes: {
                message: 'message',
                autoplaceholder: 'autoPlaceholder',
                preferredcountries: 'preferredCountries',
                utilsscript: 'utilsScript'
            },

            init: function(validator, $field, options) {
                // Determine the preferred countries
                var autoPlaceholder    = options.autoPlaceholder === true || options.autoPlaceholder === 'true',
                    preferredCountries = options.preferredCountries || 'us';
                if ('string' === typeof preferredCountries) {
                    preferredCountries = preferredCountries.split(',');
                }

                // Attach the intlTelInput on field
                $field.intlTelInput({
                    utilsScript: options.utilsScript || '',
                    autoPlaceholder: autoPlaceholder,
                    preferredCountries: preferredCountries
                });

                // Revalidate the field when changing the country
                var $form     = validator.getForm(),
                    fieldName = $field.attr('data-fv-field');
                $form.on('click.country.intphonenumber', '.country-list', function() {
                    $form.formValidation('revalidateField', fieldName);
                });
            },

            destroy: function(validator, $field, options) {
                $field.intlTelInput('destroy');

                validator.getForm().off('click.country.intphonenumber');
            },

            validate: function(validator, $field, options) {
                return $field.val() === '' || $field.intlTelInput('isValidNumber');
            }
        };


        $('#leadForm').formValidation({
            framework: 'bootstrap4',
            icon: {
            valid: 'fa fa-check',
            invalid: 'fa fa-remove',
            validating: 'fa fa-refresh'
            },
            fields: {
            fullname: {
                validators: {
                    notEmpty: {
                        message: 'The Full name is required'
                    },
                    stringLength: {
                        min: 1,
                        max: 30,
                        message: 'The name must be more than 6 and less than 30 characters long. '
                    },
                    regexp: {
                        regexp: /^[a-zA-Z \.]+$/,
                        message: 'The name can only consist of alphabetical'
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
            },

            // phoneNumber: {
            //     validators: {
            //         notEmpty: {
            //             message: 'The phone number is required'
            //         },
            //         intPhoneNumber: {
            //             utilsScript: '/libs/utils.js',
            //             autoPlaceholder: true,
            //             preferredCountries: 'fr,us,gb',
            //             message: 'The phone number is not valid'
            //         }
            //     }
            // }
            // phone number field
            phoneNumber: {
                validMessage: 'The phone number looks great',
                validators: {
                    notEmpty: {
                        message: 'Please supply a phone number so we can call if there are any problems using this address.'
                    },
                    stringLength: {
                        min: 10,
                        message: 'Not a valid 10-digit US phone number (must not include spaces or special characters)'
                    }
                }
            },
          }
        })
        // .on('success.field.fv', function(e, data) {
        //     var length = data.fv.getInvalidFields().length;
        //     console.log('Firedddddddddddddddd', length);
        //     if (!isFormDirty) {
        //         data.fv.disableSubmitButtons(true);
        //         isFormDirty = true;
        //         return;
        //     }
        //     if (length > 0) {    // There is invalid field
        //         data.fv.disableSubmitButtons(true);
        //     }
        // })
        .on('click', '.country-list', function() {
            $('#leadForm').formValidation('revalidateField', 'phoneNumber');
        });


        
        $('input[name=phoneNumber]').mask('000-000-0000', {'translation': {0: {pattern: /[0-9*-]/}}});
       


    }, 0);


}]);
