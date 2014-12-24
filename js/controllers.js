var ud="";

angular.module('starter.controllers', ['ionic', 'firebase', 'firebaseservices'])
.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $firebase, FireBaseServices, $location) {

    $scope.loginlogout = "Login";
    $scope.userdata = [];
    $scope.logind = {};
    
    
    // authenticate for database login
//    var authenticatesuccess = function (data, status) {
//        console.log(data);
//    };
//    FireBaseServices.authenticate1().success(authenticatesuccess);
    console.log(FireBaseServices.getuser());
    
    //farebase authenticate service.js/authenticate
    $scope.userdata = FireBaseServices.authenticate();
    
    if ($scope.userdata == null) {
        $scope.loginlogout = "Login";
    } else {
        $scope.loginlogout = "Logout";
    }
    // Form data for the login modal
    $scope.loginData = {};
    $scope.registerdata = {};

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

    var loginsuccess = function (data, status) {
//        console.log(data);
        ud=data;
        console.log("myid");
        console.log(ud);
        FireBaseServices.setuserid(data);
            window.location.reload(false);
    };
    
    var onloginsuccess = function (error, authData) {
        FireBaseServices.authenticate();
        FireBaseServices.firbasecallonchange();
        if (error === null) {
//            $.jStorage.set("user", authData);
            console.log(1);
            FireBaseServices.login($scope.loginData.username,$scope.loginData.password).success(loginsuccess);
            
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

        $location.url('/chat');
        $scope.modal.hide();

    }

    //    normal registration service.js/normalregistration\
    var addusersuccess = function (data, status) {
        console.log(data);
    };
    
    var registersuccess = function (error) {
        
        // User Register to Database
        
        if (error === null) {
            console.log("User created successfully");
            FireBaseServices.adduser($scope.registerdata.name,$scope.registerdata.username,$scope.registerdata.password).success(addusersuccess);
//            FireBaseServices.a
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

    
    $scope.allchats = [];
    $scope.check = 0;
    
    // get logged in user stored in jstorage
    $scope.user=FireBaseServices.getuser();
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
    
    var chatsuccess = function (data, status){
//        $scope.allchats = [];
        for(var i = 0 ; i < data.queryresult.length ; i++)
        {
            console.log(JSON.parse(data.queryresult[i].json));
            $scope.allchats.push(JSON.parse(data.queryresult[i].json));
            
        }
        ud = data.queryresult[0].userid;
        $ionicScrollDelegate.scrollBottom(true);
    };
    if($scope.userdata!=null){
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
        chat.message="";
        // Update the scroll area
        $ionicScrollDelegate.scrollBottom(true);
    };
});