angular.module('tactical').controller('BuymodalCtrl', function ($scope , $uibModalInstance , $timeout) {
    
    console.log("BuymodalCtrl Running");

    $scope.leadFormSubmit = function () {
        console.log("ok");
    };

    $timeout(function () {

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
            },

            phoneNumber: {
                validators: {
                    notEmpty: {
                        message: 'The phone number is required'
                    },
                    intPhoneNumber: {
                        utilsScript: '/libs/utils.js',
                        autoPlaceholder: true,
                        preferredCountries: 'fr,us,gb',
                        message: 'The phone number is not valid'
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
