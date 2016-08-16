angular.module('tactical').controller('CheckoutCtrl', ['$scope','$state','$stateParams','$http', '$timeout','tacticalService', function ($scope ,$state, $stateParams,$http, $timeout , tacticalService) {
 
    console.log("CheckoutCtrl Running", $stateParams.modalData);
    
    $scope.checkoutData = {
        firstName : "",
        lastName : "",
        emailAddress : "",
        phoneNumber: "",
        address1: "",
        address2 : "",
        city : "",
        state : "",
        postalCode : "",
        cardNumber : "",
        cardSecurityCode : "",
        cardMonth : "",
        cardYear : "",
        product1_qty : "",
        product1_id : ""
    };

    $scope.productQuantiyMapping = {
        "6": 5,
        "4": 3,
        "2": 1,
        "3": 2,
        "5": 4,
        "7": 10,
        "8": 15,
        "9": 20
    };

    $timeout(function () {

        function checkout_field_validation(fields){
            for(var i in fields){
                $('#checkoutForm').formValidation('revalidateField', fields[i]);
            }
        }

        var ZIPRevalidateFields = ['city', 'state'];

        $('input[type=number]').on('keydown', function (e) {
            e = (e) ? e : window.event;
            var charCode = (e.which) ? e.which : e.keyCode;
            var availableChar = [8, 18, 33, 34, 35, 36, 37, 38, 39, 40, 46];
            if (availableChar.indexOf(charCode) !== -1) {
                return true;
            }
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            return true;
        });

        $('input[type=tel]').on('keydown', function (e) {
            e = (e) ? e : window.event;
            var charCode = (e.which) ? e.which : e.keyCode;
            if (charCode === 189)  {
                return false;
            }
            return true;
        });


        // Credit Card Behavior >>>
        $("input#creditcard").detectCard({supported:['american-express', 'visa', 'mastercard', 'discover']});

        $("input#creditcard").on('keyup', function() {
            if ($(this).val() === '' || $(this).val() === undefined) {
                $(this).parents('.form-group').prev('.payment-icon').find('.cc-icon').removeClass('inactive active');
            }
        })
            .on("cardChange", function(e, card) {
            if (card.supported) {
                $('.payment-icon .cc-icon.cc-'+ card.type).parents('a').siblings().find('.cc-icon').removeClass('active').addClass('inactive');
                $('.payment-icon .cc-icon.cc-'+ card.type)
                    .removeClass('inactive')
                    .addClass('active');
            }
            else {
                $('.payment-icon .cc-icon').removeClass('inactive active');
            }
        });
        //  <<< Credit Card Behavior


        $('input[name=zipcode]').on('keyup', function(){
            if ($(this).val().length === 5) {
                var path = 'https://newapi.tacticalmastery.com/api/v1.0/state/';
                $.ajax({
                    url: path + $(this).val() + '/?',
                    type: 'GET',
                    dataType: 'json',
                    success: function(response) {
                        if (response.success) {
                            if (response.data) {
                                $('select[name=state]').val(response.data.state);
                                $('input[name=city]').val(response.data.primary_city);
                                checkout_field_validation(ZIPRevalidateFields);
                            }
                        }
                        else {
                            $('select[name=state]').val('');
                            $('input[name=city]').val('');
                            checkout_field_validation(ZIPRevalidateFields);
                        }
                    },
                    error: function (response) {
                        $('select[name=state]').val('');
                        $('input[name=city]').val('');
                        checkout_field_validation(ZIPRevalidateFields);
                    }

                });
            }
        });

        $('#checkoutForm')
            .on('init.field.fv', function (e, data) {
                var field = data.field,        // Get the field name
                    $field = data.element,      // Get the field element
                    bv = data.fv;           // FormValidation instance

                // Create a span element to show valid message
                // and place it right before the field
                var $span = $('<small/>')
                    .addClass('help-block validMessage text-success')
                    .attr('data-field', field)
                    .insertAfter($field)
                    .hide();

                // Retrieve the valid message via getOptions()
                var message = bv.getOptions(field).validMessage;
                if (message) {
                    $span.html(message);
                }
            })
            .formValidation({
                framework: 'bootstrap4',
                icon: {
                    valid: 'fa fa-check',
                    invalid: 'fa fa-remove',
                    validating: 'fa fa-refresh'
                },
                autoFocus: true,
                fields: {
                    // Name field
                    name: {
                        validMessage: 'Nice to meet you!',
                        validators: {
                            notEmpty: {
                                message: 'The name is required'
                            },
                            stringLength: {
                                max: 30,
                                message: 'The name must be more than 6 and less than 30 characters long. '
                            },
                            // regexp: {
                            //     regexp: /^[a-zA-Z' \.]+$/,
                            //     message: 'The name can only consist of alphabetical'
                            // }
                        }
                    },
                    // Email field
                    email: {
                        validMessage: 'We will email you a confirmation',
                        validators: {
                            notEmpty: {
                                message: 'The email address is required'
                            },
                            stringLength: {
                                min: 1,
                                max: 100,
                                message: 'The email address must be more than 6 and less than 30 characters long. '
                            },
                            regexp: {
                                regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                                message: 'The value is not a valid email address'
                            }
                        }
                    },
                    // phone number field
                    phonenumber: {
                        validMessage: 'We will only contact you about your order',
                        validators: {
                            notEmpty: {
                                message: 'Please supply a phone number so we can call if there are any problems using this address.'
                            },
                            stringLength: {
                                min: 10,
                                message: 'Not a valid 10-digit US phone number.'
                            }
                        }
                    },
                    // zip code field
                    zipcode: {
                        validMessage: null,
                        validators: {
                            stringLength: {
                                min: 5,
                                message: 'The zip code must be 5 number long '
                            },
                            notEmpty: {
                                message: 'The zip code is required'
                            },
                        }
                    },
                    // The City  field
                    city: {
                        validMessage: 'That was easy!',
                        validators: {
                            stringLength: {
                                max: 50,
                                message: 'The city must be less than 50 characters long. '
                            },
                            notEmpty: {
                                message: 'The city is required'
                            }
                        }
                    },
                    // address field
                    address: {
                        validMessage: 'We ship anywhere in the USA',
                        validators: {
                            stringLength: {
                                min: 1,
                                max: 100,
                                message: 'The address must be less than 100 characters long. '
                            },
                            notEmpty: {
                                message: 'The address is required'
                            }
                        }
                    },
                    address2: {
                        validators: {
                            stringLength: {
                                min: 1,
                                max: 100,
                                message: 'The address2 must be less than 100 characters long. '
                            }
                        }
                    },
                    // Card Number
                    creditcard: {
                        validMessage: 'Your credit card looks great!',
                        validators: {
                            creditCard: {
                                message: 'The credit card number is not valid',
                                transformer: function ($field, validatorName, validator) {
                                    // Get the number provided by user
                                    var value = $field.val();
                                    // Check if it's one of test card numbers
                                    if (value === '0000000000000000') {
                                        // then turn it to be a valid one defined by VALID_CARD_NUMBER
                                        return '4441444444444441';
                                    } else {
                                        // Otherwise, just return the initial value
                                        return value;
                                    }
                                }
                            },
                            notEmpty: {
                                message: 'Please enter a valid card number'
                            },
                            // // stringLength: {
                            //   min: 15,
                            //   message: 'The credit card can be 15 or 16 digits. '
                            // }
                        }
                    },
                    cardSecurityCode: {
                        validators: {
                            notEmpty: {
                                message: 'Please enter a valid security code'
                            },
                            stringLength: {
                                min: 3,
                                max: 4,
                                message: 'Security code Invalid Length'
                            }
                        }
                    },
                    // State
                    state: {
                        validMessage: null,
                        validators: {
                            notEmpty: {
                                message: 'The State is required'
                            }
                        }
                    },
                    // Security Code
                    securitycode: {
                        validators: {
                            notEmpty: {
                                message: 'The Security Code is required'
                            }
                        }
                    },
                    // Month
                    month: {
                        validators: {
                            notEmpty: {
                                message: 'The Month is required'
                            },
                            callback: {
                                message: 'Please set month more or equal current',
                                callback: function(value, validator, $field) {
                                    var currentDate = new Date();
                                    var year    = parseInt(currentDate.getYear());
                                    var yearVal = parseInt($('#checkoutForm').find('[name=year]').val());

                                    if (yearVal === null || yearVal === undefined) {
                                        return true;
                                    }
                                    else {
                                        var selectedYear = 100 + parseInt($('#checkoutForm').find('[name=year]').val());

                                        if (selectedYear === year) {
                                            return (parseInt(value)-1 >= parseInt(currentDate.getMonth()));
                                        }
                                        else {
                                            return true;
                                        }
                                        checkout_field_validation(['year']);
                                    }
                                }
                            }
                        }
                    },
                    // Year
                    year: {
                        validators: {
                            notEmpty: {
                                message: 'The Year is required'
                            },
                            callback: {
                                message: 'Please set year more or equal current',
                                callback: function(value, validator, $field) {
                                    var currentDate = new Date();
                                    var yearCondition = 100+parseInt(value) >= parseInt(currentDate.getYear());

                                    checkout_field_validation(['month']);

                                    // if (100+parseInt(value) > parseInt(currentDate.getYear())) {
                                    // }

                                    return yearCondition;
                                }
                            }
                        }
                    }
                }
            })
            .on('err.field.fv', function(e, data) {
            })
            .on('success.validator.fv', function(e, data) {
            })
            .on('err.form.fv', function (e, data) {
            })
            .on('success.form.fv', function (e, data) {

                console.log("success.form.fv");
                e.preventDefault();

                $scope.checkoutData = {
                    cardSecurityCode: ""
                };//checkoutForm

                $scope.checkoutData.firstName = $('#name').val();
                $scope.checkoutData.lastName = "NA";
                $scope.checkoutData.emailAddress = $('#email').val();
                $scope.checkoutData.phoneNumber = $('#phonenumber').val();
                $scope.checkoutData.postalCode = $('#zipcode').val();
                $scope.checkoutData.state = $("#state option:selected").text();
                $scope.checkoutData.city = $('#city').val();
                $scope.checkoutData.address1 = $('#address').val();
                $scope.checkoutData.address2 = $('#address2').val();
                $scope.checkoutData.cardNumber = $('#creditcard').val();
                $scope.checkoutData.cardMonth = $('#month option:selected').text();
                $scope.checkoutData.cardYear = $('#year option:selected').text();
                $scope.checkoutData.cardSecurityCode = $('#cardSecurityCode').val();
                $scope.checkoutData.product1_id = $('input[name=productRadio]:checked', '#checkoutForm').val();// $("input:radio[name ='product']:checked").val();
                $scope.checkoutData.product1_qty = $scope.productQuantiyMapping[$scope.checkoutData.product1_id];

                tacticalService.postToNewApiServer('create-order', $scope.checkoutData).then(function (resp) {
                    console.log("create-order success", resp);

                    var orderData = {
                        dateCreated: resp.data.dateCreated,
                        f_address1: resp.data.address1,
                        f_city: resp.data.city,
                        f_name: resp.data.firstName,
                        f_emailAddress: resp.data.emailAddress,
                        f_phoneNumber: resp.data.phoneNumber,
                        orderId: resp.data.orderId,
                        f_postalCode: resp.data.postalCode,
                        initialProductId: resp.data.items[0].productId
                    };

                    localStorage.setItem('orderData', JSON.stringify(orderData));

                    $state.go('batteryoffer', { });
                },
                    function (err) {
                        console.log("create-order err" , err);
                    }
                );
                

                // var inputdata = {
                //     "firstName": "Shahjada",
                //     "lastName": "NA",
                //     "emailAddress": "asasas@gmail.com",
                //     "phoneNumber": "123-123-1234",
                //     "address1": "Just add 1",
                //     "address2": "Just add 2",
                //     "city": "NY",
                //     "state": "NY",
                //     "postalCode": "789",
                //     "cardNumber": "0000000000000000",
                //     "cardSecurityCode": "100",
                //     "cardMonth": "5",
                //     "cardYear": "2017",
                //     "product1_qty": "3",
                //     "product1_id": "7"
                // };

                // tacticalService.postToNewApiServer('create-order', inputdata);

                        

                // $http
                
            })
            .on('success.field.fv', function (e, data) {
                var field = data.field,        // Get the field name
                    $field = data.element;      // Get the field element

                // Show the valid message element
                $field.next('.validMessage[data-field="' + field + '"]').show();

                if(data.fv.getInvalidFields().length === 0) {
                    if ($('#checkoutForm .fv-has-feedback.has-warning').length > 0) {
                        $('#checkoutForm .btn-complete').removeClass('pulse');
                    }
                    else {
                        if ($('#checkoutForm .fv-has-feedback.has-success').length >= 11) {
                            $('#checkoutForm .btn-complete').addClass('pulse');
                        }
                        else {
                            $('#checkoutForm .btn-complete').removeClass('pulse');
                        }
                    }
                }
                else {
                    $('#checkoutForm .btn-complete').removeClass('pulse');
                }
            })
            .on('err.field.fv', function (e, data) {
                var field = data.field,        // Get the field name
                    $field = data.element;      // Get the field element

                if(data.fv.getInvalidFields().length === 0) {
                    if ($('#checkoutForm .fv-has-feedback.has-warning').length > 0) {
                        $('#checkoutForm .btn-complete').removeClass('pulse');
                    }
                    else {
                        if ($('#checkoutForm .fv-has-feedback.has-success').length >= 11) {
                            $('#checkoutForm .btn-complete').addClass('pulse');
                        }
                        else {
                            $('#checkoutForm .btn-complete').removeClass('pulse');
                        }
                    }
                }
                else {
                    $('#checkoutForm .btn-complete').removeClass('pulse');
                }

                // Show the valid message element
                $field.next('.validMessage[data-field="' + field + '"]').hide();
            });

            $('input[name=creditcard]').mask('0000000000000000', {'translation': {0: {pattern: /[0-9*]/}}});
            $('input[name=phonenumber]').mask('000-000-0000', {'translation': {0: {pattern: /[0-9*-]/}}});
            $('input[name=zipcode]').mask('00000', {'translation': {0: {pattern: /[0-9]/}}});
    }, 0);
}]);
