var ud = "";

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
            console.log("logout pressed");
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

.controller('ChatCtrl', function ($scope, $stateParams, $ionicScrollDelegate, FireBaseServices, $state) {
    if (FireBaseServices.checklogin()) {
        $state.go('app.chat');
    } else {
        $state.go('login');
    }
    $scope.allchats = [];
    $scope.check = 0;
    // get logged in user stored in jstorage
    $scope.user = FireBaseServices.getuser();
    //    console.log($scope.user);

    // get user data by getAuth() function
    $scope.userdata = FireBaseServices.authenticate();
    console.log("user user");
    console.log($scope.userdata);
    $scope.chat = {};

    function changeevent(message) {
        console.log(message);
        $scope.$apply();

    };
    FireBaseServices.changecallback(changeevent);
    // get chat from databse on page load

    console.log($scope.chat);
    var ref = new Firebase("https://blinding-heat-5568.firebaseio.com/");

    var chatsuccess = function (data, status) {
        //        $scope.allchats = [];
        for (var i = 0; i < data.queryresult.length; i++) {
            console.log(JSON.parse(data.queryresult[i].json));
            $scope.allchats.push(JSON.parse(data.queryresult[i].json));

        }
        ud = data.queryresult[0].userid;
        $ionicScrollDelegate.scrollBottom(true);
    };
    if ($scope.userdata != null) {
        FireBaseServices.getchatbyuser($scope.userdata.password.email).success(chatsuccess);
    }
    //    if($scope.check == 1)
    //    {
    $scope.allchats = FireBaseServices.getchats();
    $ionicScrollDelegate.scrollBottom(true);
    //    }
    //    $scope.allchats.push({email: "jagruti@wohlig.com", name: "simplelogin:1", text: "hey whats up", timestamp: 1418016362961});

    // updating chat in service.js/update
    $scope.send = function (chat) {
        console.log(chat.message);
        $scope.check = 1;
        console.log(ud);
        FireBaseServices.update($scope.userdata.uid, $scope.userdata.password.email, chat.message, ud);
        chat.message = "";
        // Update the scroll area
        $ionicScrollDelegate.scrollBottom(true);
    };
})
    .controller('TravelCtrl', function ($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location) {

    })
    .controller('LogoutCrtl', function ($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location, $state) {
        if (FireBaseServices.checklogin()) {
            $location.url('app.chat');
        } else {
            $location.url('login');
        }
        $scope.loginData = [];
        var logoutsuccess = function (data, status) {
            console.log(data);
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
            console.log("on databse login success");
            console.log(data);
            ud = data;
            console.log("myid");
            console.log(ud);
            FireBaseServices.setuserid(data);
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

                //                FireBaseServices.firbasecallonchange();
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
            FireBaseServices.normallogin(loginData.username, loginData.password, onloginsuccess,oncancel);

        }

    })
    .controller('TravelCtrl', function ($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location) {

    });