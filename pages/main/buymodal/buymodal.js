//angular.module('tactical').controller('BuymodalCtrl', function ($scope, $uibModalInstance, $timeout) {
angular.module('tactical').controller('BuymodalCtrl', ['$scope','$rootScope', '$state','$timeout', function ($scope ,$rootScope, $state, $timeout ) {

    console.log("BuymodalCtrl Running");

    $scope.formData = {
        fullname: '',
        email: '',
        phoneNumber : ''
    };
    
    $timeout(function () {

        $('#buyModal').on('shown.bs.modal', reposition);

        function reposition() {
            $("#fullname").focus();
            var modal = $(this),
                dialog = modal.find('.modal-dialog');

            modal.css('display', 'block');
            dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
        }

        // Reposition when the window is resized
        $(window).on('resize', function() {
            $('.modal:visible').each(reposition);
        });


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


        $('#buyForm').formValidation({
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
                            max: 35,
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
                            regexp: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            message: 'This is not a valid email address'
                        }
                    }
                },
            
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
        }).on('success.form.fv', function (e) {            
            console.log("success.form.fv");
            e.preventDefault();
            $('#buyModal').modal('hide');
            $rootScope.modalData = $scope.formData;            
            setTimeout(function () {
                $state.go('checkout', { modalData: $scope.formData });
            }, 333);
        });
        
        $('input[name=phoneNumber]').mask('000-000-0000', { 'translation': { 0: { pattern: /[0-9*-]/ } } });

    }, 0);

    
}]);
