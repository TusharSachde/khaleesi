var ud = "";
var online = false;

angular.module('starter.controllers', ['ionic', 'firebase', 'firebaseservices'])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location) {

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
        $scope.logout = function () {
            if (FireBaseServices.logout() == 1) {
                $scope.loginlogout = "Login";
            }
        }
        //
        //        // Open the login modal
        //        $scope.login = function () {
        //            $scope.modal.show();
        //        };
        //
        //        // Open the register modal
        //        $scope.register = function () {
        //            $scope.modal.hide();
        //            $scope.modal2.show();
        //        };
        //
        //        // Perform the login action when the user submits the login form
        //        $scope.doLogin = function () {
        //            console.log('Doing login', $scope.loginData);
        //
        //            // Simulate a login delay. Remove this and replace with your login
        //            // code if using a login system
        //            $timeout(function () {
        //                $scope.closeLogin();
        //            }, 1000);
        //        };
        //
        //        var loginsuccess = function (data, status) {
        //            //        console.log(data);
        //            ud = data;
        //            console.log("myid");
        //            console.log(ud);
        //            FireBaseServices.setuserid(data);
        //            window.location.reload(false);
        //        };
        //
        //        var onloginsuccess = function (error, authData) {
        //            FireBaseServices.authenticate();
        //            FireBaseServices.firbasecallonchange();
        //            if (error === null) {
        //                //            $.jStorage.set("user", authData);
        //                console.log(1);
        //                FireBaseServices.login($scope.loginData.username, $scope.loginData.password).success(loginsuccess);
        //
        //                //            $location.url('/search');
        //
        //            } else {
        //                console.log("Error authenticating user:", error);
        //                console.log(0);
        //            }
        //        }
        //        var normalloginsuccess = function (data, status) {
        //            console.log(data);
        //            $scope.modal.hide();
        //        };
        //
        //        //    normal login service.js/normallogin
        //        $scope.normallogin = function (loginData) {
        //            FireBaseServices.normallogin(loginData.username, loginData.password, onloginsuccess);
        //            $location.url('/chat');
        //            $scope.modal.hide();
        //
        //        }
        //
        //        //    normal registration service.js/normalregistration\
        //        var addusersuccess = function (data, status) {
        //            console.log(data);
        //        };
        //
        //        var registersuccess = function (error) {
        //
        //            // User Register to Database
        //
        //            if (error === null) {
        //                console.log("User created successfully");
        //                FireBaseServices.adduser($scope.registerdata.name, $scope.registerdata.username, $scope.registerdata.password).success(addusersuccess);
        //                //            FireBaseServices.a
        //                $scope.modal.show();
        //            } else {
        //                console.log("Error creating user:", error);
        //            }
        //        };
        //        $scope.normalregister = function (logindata) {
        //            FireBaseServices.normalregister(logindata.username, logindata.password, registersuccess);
        //            $scope.modal2.hide();
        //            $location.url('/search');
        //        }

    })

.controller('BrowseCtrl', function ($scope, $stateParams, $rootScope, $ionicScrollDelegate, FireBaseServices, $firebase) {



})

.controller('ChatCtrl', function ($scope, $stateParams, $ionicScrollDelegate, FireBaseServices, $state, $location) {
    $('#txtSendTo').focus();
    if (FireBaseServices.checklogin()) {
        $state.go('app.chat');
    } else {
        $state.go('login');
    }

    ud = $.jStorage.get("user").id;

    // get logged in user stored in jstorage
    $scope.user = FireBaseServices.getuser();

    $scope.convertform = function (val) {
        var fff = JSON.parse(val);
        fff.json = JSON.parse(fff.json);
        return fff;
    };
    $scope.convertproduct = function (val) {
        return JSON.parse(val);
    };
    $scope.allchats = [];
    $scope.allchats.json = [];
    $scope.msg = '';

    $scope.data = [];
    var formsavesuccess = function (data, status) {
        $scope.check = false;
        $scope.data.message = "Form Submited Successfully";
        $scope.send($scope.data);
    };


    // product place order
    //    $scope.form.productmsg = "";
    var productsuccess = function (data, status) {
        if (data == 1) {
            $scope.data.message = "Order Send";
            $scope.send($scope.data);
            //            $scope.form.productmsg = "Product Saved...We'll come back to you soon...";
        }
    };
    $scope.placeorder = function (product) {
        console.log("place order");
        $location.url('tab/placeorder/' + product.id);
        //        FireBaseServices.adduserproduct(product.id, $scope.user.id, JSON.stringify(product)).success(productsuccess);
    }

    // form div validation
    $scope.submitt = function (val, message) {
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


    var onnewchat = function () {
        console.log("new Chat received");
        $ionicScrollDelegate.scrollBottom(true);
        $('#txtSendTo').focus();
    };
    $scope.online = "";
    $scope.line = "offline";
    $scope.useremail=FireBaseServices.getauthemail();
    var onsergychange = function (data) {
        $scope.lastseen = data;
        if(data.text=="on")
        {
            if(data.email==$scope.useremail)
            {
                console.log("waiting waiting");
                $scope.line = "online";
                $scope.$apply();
            }else{
                $scope.line = "waiting";
                $scope.$apply();
            }
            
        }else{
            $scope.line = "offline";
            $scope.$apply();
        }
    }
    var chatsuccess = function (data, status) {
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
        $('#txtSendTo').focus();
        console.log("getchatbyuser.......................////////////");
        console.log($scope.allchats);


        //        ud = data.queryresult[0].userid;
        $ionicScrollDelegate.scrollBottom(true);
    };
    if ($scope.userdata != null) {
        FireBaseServices.getchatbyuser($scope.userdata.password.email, chatsuccess);
    }
    //    if($scope.check == 1)
    //    {
    $scope.allchats = FireBaseServices.getchats();
    $('#txtSendTo').focus();
    $ionicScrollDelegate.scrollBottom(true);
    //    }
    //    $scope.allchats.push({email: "jagruti@wohlig.com", name: "simplelogin:1", text: "hey whats up", timestamp: 1418016362961});

    // updating chat in service.js/update

    function newfun(data) {

        //        $scope.allchats = FireBaseServices.getchats();
        console.log($scope.allchats);
        $('#txtSendTo').focus();

    }

    $scope.allvalidation1 = [];
    $scope.showsend = false;
    
    $scope.checksend = function (){
        console.log("chekc check");
        if($scope.chat.message)
        {
            $scope.showsend = true;
        }else{
            $scope.showsend = false;
        }
    }
    
    $scope.send = function (chat) {
        
        
                if(chat.message)
                {
                FireBaseServices.update($scope.userdata.uid, $scope.userdata.password.email, chat.message, ud, newfun);
                chat.message = "";

                // Update the scroll area
                $ionicScrollDelegate.scrollBottom(true);
                $('#txtSendTo').focus();
                }else{
                    
                    console.log("not not not check");
                }
    };
    

    
    
})
    .controller('TravelCtrl', function ($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location) {

        //        DECLARATION
        $scope.orders = [];

        //        GET USER FROM jStorage
        ud = $.jStorage.get("user").id;

        //        GET ALL ORDERS BY USER ID
        var ordersuccess = function (data, status) {
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
    .controller('PlaceOrderCtrl', function ($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location, $stateParams, $state) {

        ud = $.jStorage.get("user").id;

        //        getproduct by product id
        var productssuccess = function (data, status) {
            console.log(data);
            $scope.product = data.product;
        };
        FireBaseServices.getproductbycategoryid($stateParams.id).success(productssuccess);

        //        place order
        var placeordersuccess = function (data, status) {
            console.log(data);
            if (data == "1") {
                $state.go('app.chat');
                $location.url('app/chat');
            }
        };

        $scope.placeorder = function (form) {
            console.log(form);
            form.user = ud;
            form.productid = $scope.product.id;
            FireBaseServices.placeorder(form).success(placeordersuccess);
        }

    })
    .controller('LogoutCrtl', function ($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location, $state) {
        if (FireBaseServices.checklogin()) {
            $location.url('app.chat');
        } else {
            $location.url('login');
        }
        $scope.loginData = [];
        var logoutsuccess = function (data, status) {
            $scope.allchats = FireBaseServices.getchats();
            console.log(allchats);
            console.log("chat after logout");
            console.log($scope.allchats);
            $location.url("login");
        };
        FireBaseServices.logout(logoutsuccess);
    })
    .controller('LoginCtrl', function ($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location, $state) {
        $scope.loginData = [];

        if (FireBaseServices.checklogin()) {
            $location.url('app/chat');
        } else {
            $location.url('login');
        }

        var loginsuccess = function (data, status) {
            //        console.log(data);
            ud = data;
            FireBaseServices.setuserid(data);
            ud = $.jStorage.get("user").id;
            $location.url('app/chat');
            //$state.go('app.chat');

        };

        var onloginsuccess = function (error, authData) {
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
        var normalloginsuccess = function (data, status) {
            console.log(data);
            $scope.modal.hide();
        };
        var oncancel = function (error) {
            console.log("Error.......................................................");
            console.log(error);
        };

        //    normal login service.js/normallogin
        $scope.normallogin = function (loginData) {
            FireBaseServices.normallogin(loginData.username, loginData.password, onloginsuccess, oncancel);
            FireBaseServices.login(loginData.username, loginData.password).success(loginsuccess);


        }

    });