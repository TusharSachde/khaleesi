angular.module('starter.controllers', ['ionic', 'firebase', 'firebaseservices'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location) {

    $scope.loginlogout = "Login";
    $scope.userdata = [];
    //farebase authenticate service.js/authenticate
    $scope.userdata = FireBaseServices.authenticate();
    if ($scope.userdata == null) {
        $scope.loginlogout = "Login";
    } else {
        $scope.loginlogout = "Logout";
    }
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    // Create the register modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal2 = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };
    // Triggered in the login modal to close it
    $scope.closeRegister = function () {
        $scope.modal2.hide();
    };

    // on logout 
    $scope.logout = function () {
        console.log("logout pressed");
        if (FireBaseServices.logout() == 1) {
            $scope.loginlogout = "Login";
        }
    }

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Open the register modal
    $scope.register = function () {
        $scope.modal.hide();
        $scope.modal2.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };

    var onloginsuccess = function (error, authData) {
        FireBaseServices.authenticate();
        FireBaseServices.firbasecallonchange();
        if (error === null) {
            window.location.reload(false);
            $.jStorage.set("user", authData);
            console.log(1);
            //            $location.url('/search');

        } else {
            console.log("Error authenticating user:", error);
            console.log(0);
        }
    }

    //    normal login service.js/normallogin
    $scope.normallogin = function (loginData) {

        var normalloginsuccess = function (data, status) {
            console.log(data);
            $scope.modal.hide();
        };
        FireBaseServices.normallogin(loginData.username, loginData.password, onloginsuccess);
        //        console.log($scope.logindata);

        $location.url('/search');
        $scope.modal.hide();

    }

    //    normal registration service.js/normalregistration
    var registersuccess = function (error) {
        if (error === null) {
            console.log("User created successfully");
            $scope.modal.show();
        } else {
            console.log("Error creating user:", error);
        }
    };
    $scope.normalregister = function (logindata) {
        FireBaseServices.normalregister(logindata.username, logindata.password, registersuccess);
        $scope.modal2.hide();
        $location.url('/search');
    }

})

.controller('BrowseCtrl', function ($scope, $stateParams, $rootScope, $ionicScrollDelegate, FireBaseServices, $firebase) {



})

.controller('ChatCtrl', function ($scope, $stateParams, $ionicScrollDelegate, FireBaseServices, $firebase) {

    // get user data by getAuth() function
    $scope.userdata = FireBaseServices.authenticate();
    console.log($scope.userdata);
    $scope.chat = {};

    function changeevent(message) {
        console.log(message);
        if(message.email!=FireBaseServices.getauthemail())
        {
            $scope.$apply();
        }
        
    };


    FireBaseServices.changecallback(changeevent);
    // get chat from databse on page load
    //    $scope.chat = FireBaseServices.chat();

    console.log($scope.chat);
    var ref = new Firebase("https://blinding-heat-5568.firebaseio.com/");

    $scope.allchats = FireBaseServices.getchats();

    // updating chat in service.js/update
    $scope.send = function (chat) {
        console.log(chat.message);
        FireBaseServices.update($scope.userdata.uid, $scope.userdata.password.email, chat.message);
        //        $scope.chat = FireBaseServices.chat();

        // Update the scroll area
        $ionicScrollDelegate.scrollBottom(true);
    };
});