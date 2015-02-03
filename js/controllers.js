var ud = "";
var online = false;

angular.module('starter.controllers', ['ionic', 'firebase', 'firebaseservices', 'ngSanitize'])
    .controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location) {

        $scope.demo = "demo";
        $scope.loginlogout = "Login";
        $scope.userdata = [];
        $scope.logind = {};


        console.log(FireBaseServices.getuser());
        $scope.userdata = FireBaseServices.authenticate();

        if ($scope.userdata == null) {
            $scope.loginlogout = "Login";
        } else {
            $scope.loginlogout = "Logout";
        }
        //
        //        $scope.loginData = {};
        //        $scope.registerdata = {};
        //
        //        // on logout 
        $scope.logout = function() {
            if (FireBaseServices.logout() == 1) {
                $scope.loginlogout = "Login";
            }
        }

    })

.controller('HotelCtrl', function($scope, $stateParams, $rootScope, $ionicSlideBoxDelegate, $timeout, $ionicScrollDelegate, FireBaseServices, $firebase) {
//SLIDE BOX
    $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
    };
    $scope.prevSlide = function () {
        $ionicSlideBoxDelegate.previous();
    };
    $timeout(function () {
        $ionicSlideBoxDelegate.update();
        
    }, 2000);
})

.controller('GoodCtrl', function($scope, $stateParams, $rootScope, $ionicSlideBoxDelegate, $timeout, $ionicScrollDelegate, FireBaseServices, $firebase) {
//SLIDE BOX
    $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
    };
    $scope.prevSlide = function () {
        $ionicSlideBoxDelegate.previous();
    };
    $timeout(function () {
        $ionicSlideBoxDelegate.update();
        
    }, 2000);
})
.controller('GoodbuyCtrl', function($scope, $stateParams, $rootScope, $ionicSlideBoxDelegate, $timeout, $ionicScrollDelegate, FireBaseServices, $firebase) {
//SLIDE BOX
    $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
    };
    $scope.prevSlide = function () {
        $ionicSlideBoxDelegate.previous();
    };
    $timeout(function () {
        $ionicSlideBoxDelegate.update();
        
    }, 2000);
})


.controller('ChatCtrl', function($scope, $stateParams, $ionicScrollDelegate, FireBaseServices, $state, $location) {

    $scope.formreturn = [];
//    $('#txtSendTo').focus();
    if (FireBaseServices.checklogin()) {
        $state.go('app.chat');
    } else {
        $state.go('login');
    }

    ud = $.jStorage.get("user").id;

    // get logged in user stored in jstorage
    $scope.user = FireBaseServices.getuser();

    $scope.convertform = function(val) {
        var fff = JSON.parse(val);
        fff.json = JSON.parse(fff.json);
        return fff;
    };
    $scope.convertproduct = function(val) {
        return JSON.parse(val);
    };
    $scope.allchats = [];
    $scope.allchats.json = [];
    $scope.msg = '';

    $scope.data = [];
    var formsavesuccess = function(data, status) {
        $scope.check = false;
        $scope.data.message = $scope.formreturn;

        $scope.send($scope.data, 5);
        console.log($scope.formreturn);
    };


    // product place order
    //    $scope.form.productmsg = "";
    var productsuccess = function(data, status) {
        if (data == 1) {
            $scope.data.message = "Order Send";
            $scope.send($scope.data);
            //            $scope.form.productmsg = "Product Saved...We'll come back to you soon...";
        }
    };
    $scope.placeorder = function(product) {
        console.log("place order");
        $location.url('tab/placeorder/' + product.id);
        //        FireBaseServices.adduserproduct(product.id, $scope.user.id, JSON.stringify(product)).success(productsuccess);
    }

    // form div validation
    $scope.submitt = function(val, message) {
        console.log("my form");
        $scope.formreturn = val;
        console.log(val);
        $scope.formid = val.id;
        for (var i = 0; i < val.length; i++) {
            if (!val[i].val) {
                $scope.msg = val[i].name + ' can not be blank';
            } else {
                $scope.msg = '';
            }
        }
        if ($scope.msg == '') {
            FireBaseServices.adduserform($scope.formid, $scope.user.id, JSON.stringify(val)).success(formsavesuccess);
        }
    }
    //    console.log($scope.user);

    // get user data by getAuth() function
    $scope.userdata = FireBaseServices.authenticate();
    $scope.chat = {};

    function changeevent(message) {
        //        console.log(message);
        $scope.$apply();

    };
    FireBaseServices.changecallback(changeevent);
    // get chat from databse on page load


    var onnewchat = function() {
        console.log("new Chat received");
//        $ionicScrollDelegate.scrollBottom(true);
        $(".has-header").scrollTop(10000000000);
//        $('#txtSendTo').focus();
    };
    $scope.online = "";
    $scope.line = "offline";
    $scope.useremail = FireBaseServices.getauthemail();
    var onsergychange = function(data) {
        $scope.lastseen = data;
        if (data.text == "on") {
            if (data.email == $scope.useremail) {
                console.log("waiting waiting");
                $scope.line = "online";
                $scope.$apply();
            } else {
                $scope.line = "waiting";
                $scope.$apply();
            }

        } else {
            $scope.line = "offline";
            $scope.$apply();
        }
    }
    var chatsuccess = function(data, status) {
        console.log(data);
        FireBaseServices.firbasecallonchange(onnewchat, onsergychange);
        //        $scope.allchats = [];
        //        for (var i = 0; i < data.queryresult.length; i++) {
        //            console.log("kdlfahdk");
        //            console.log(data.queryresult[i]);
        //            $scope.allchats.push(JSON.parse(data.queryresult[i].json));
        //            $scope.allchats[i].statuss=data.queryresult[i].status;
        ////            console.log($scope.allchats);
        //
        //        }

        FireBaseServices.changecallback(changeevent);
        $scope.allchats = FireBaseServices.getchats();
//        $('#txtSendTo').focus();
        console.log("getchatbyuser.......................////////////");
        console.log($scope.allchats);


        //        ud = data.queryresult[0].userid;
//        $ionicScrollDelegate.scrollBottom(true);
        $(".has-header").scrollTop(10000000000);
    };
    if ($scope.userdata != null) {
        FireBaseServices.getchatbyuser($scope.userdata.password.email, chatsuccess);
    }
    //    if($scope.check == 1)
    //    {
    $scope.allchats = FireBaseServices.getchats();
//    $('#txtSendTo').focus();
//    $ionicScrollDelegate.scrollBottom(true);
    $(".has-header").scrollTop(10000000000);
    //    }
    //    $scope.allchats.push({email: "jagruti@wohlig.com", name: "simplelogin:1", text: "hey whats up", timestamp: 1418016362961});

    // updating chat in service.js/update

    function newfun(data) {

        //        $scope.allchats = FireBaseServices.getchats();
        console.log($scope.allchats);
//        $('#txtSendTo').focus();

    }

    $scope.allvalidation1 = [];
    $scope.showsend = false;

    $scope.checksend = function() {
        console.log("chekc check");
        if ($scope.chat.message) {
            $scope.showsend = true;
        } else {
            $scope.showsend = false;
        }
    }

    $scope.send = function(chat, type) {

        console.log("type of messsage");
        console.log(type);

        if (chat.message) {
            FireBaseServices.update($scope.userdata.uid, $scope.userdata.password.email, chat.message, ud, type, newfun);
            chat.message = "";

            // Update the scroll area
//            $ionicScrollDelegate.scrollBottom(true);
            $(".has-header").scrollTop(10000000000);
//            $('#txtSendTo').focus();
        } else {

            console.log("not not not check");
        }
    };




})
    .controller('TravelCtrl', function($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location) {

        //        DECLARATION
        $scope.orders = [];

        //        GET USER FROM jStorage
        ud = $.jStorage.get("user").id;

        //        GET ALL ORDERS BY USER ID
        var ordersuccess = function(data, status) {
            console.log(data.queryresult);
            $scope.orders = data.queryresult;
        };
        FireBaseServices.getordersbyuserid(ud).success(ordersuccess);

        //        PAYMENT GETWAY
        //        $scope.StipePaymentGen = function (amount, form) {
        //            console.log("strippaymentGen form");
        //
        //            handler.open({
        //                name: 'Lyla Loves',
        //                description: 'Total Amount: £ ' + amount,
        //                amount: amount * 100,
        //
        //            });
        //        };

    })
    .controller('PlaceOrderCtrl', function($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location, $stateParams, $state) {

        ud = $.jStorage.get("user").id;

        //        getproduct by product id
        var productssuccess = function(data, status) {
            console.log(data);
            $scope.product = data.product;
        };
        FireBaseServices.getproductbycategoryid($stateParams.id).success(productssuccess);

        //        place order
        var placeordersuccess = function(data, status) {
            console.log(data);
            if (data == "1") {
                $state.go('app.chat');
                $location.url('app/chat');
            }
        };

        $scope.placeorder = function(form) {
            console.log(form);
            form.user = ud;
            form.productid = $scope.product.id;
            FireBaseServices.placeorder(form).success(placeordersuccess);
        }

    })
    .controller('LogoutCrtl', function($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location, $state) {
        if (FireBaseServices.checklogin()) {
            $location.url('app.chat');
        } else {
            $location.url('login');
        }
        $scope.loginData = [];
        var logoutsuccess = function(data, status) {
            $scope.allchats = FireBaseServices.getchats();
            console.log(allchats);
            console.log("chat after logout");
            console.log($scope.allchats);
            $location.url("login");
        };
        FireBaseServices.logout(logoutsuccess);
    })
    .controller('LoginCtrl', function($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location, $state) {

        $scope.loginData = [];

        if (FireBaseServices.checklogin()) {
            $location.url('app/chat');
        } else {
            $location.url('login');
        }

        var loginsuccess = function(data, status) {
            //        console.log(data);
            ud = data;
            FireBaseServices.setuserid(data);
            ud = $.jStorage.get("user").id;
            $location.url('app/chat');
            //$state.go('app.chat');

        };

        var onloginsuccess = function(error, authData) {
            console.log("on firebase login success");
            if (error) {
                console.log("Error");
                $scope.error = "Invalid Username and Password.";
                $scope.$apply();
            }
            if (authData) {
                console.log("Done");

                //                                FireBaseServices.firbasecallonchange();
                FireBaseServices.login($scope.loginData.username, $scope.loginData.password).success(loginsuccess);

            }

        }
        var normalloginsuccess = function(data, status) {
            console.log(data);
            $scope.modal.hide();
        };
        var oncancel = function(error) {
            console.log("Error.......................................................");
            console.log(error);
        };

        //    normal login service.js/normallogin
        $scope.normallogin = function(loginData) {
            FireBaseServices.normallogin(loginData.username, loginData.password, onloginsuccess, oncancel);
            FireBaseServices.login(loginData.username, loginData.password).success(loginsuccess);


        }

    });