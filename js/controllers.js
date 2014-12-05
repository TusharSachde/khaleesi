angular.module('starter.controllers', ['firebase', 'firebaseservices', 'ionic'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $firebase, FireBaseServices) {

    //farebase authenticate service.js/authenticate
    console.log(FireBaseServices.authenticate());

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

    //    normal login service.js/normallogin
    $scope.normallogin = function (loginData) {

        var normalloginsuccess = function (data, status) {
            console.log(data);
            $scope.modal.hide();
        };
        console.log(FireBaseServices.normallogin(loginData.username, loginData.password));
        //        console.log($scope.logindata);
        $scope.modal.hide();

    }

    //    normal registration service.js/normalregistration
    $scope.normalregister = function (logindata) {
        console.log(FireBaseServices.normalregister(logindata.username, logindata.password));
        $scope.modal2.hide();
    }

})

.controller('ChatCtrl', function ($scope, $stateParams, $ionicScrollDelegate, FireBaseServices, $firebase) {


    $scope.userdata = FireBaseServices.authenticate();
    console.log($scope.userdata);
    $scope.chat = {};
    $scope.chat = FireBaseServices.chat();

    console.log($scope.chat);
    var ref = new Firebase("https://blinding-heat-5568.firebaseio.com/");
     ref.on('child_changed', function(snapshot) {
        var message = snapshot.val();
         console.log(message);
         if (message.name == $scope.userdata.uid) {
                $('.messages').append('<li class="us"><p>'+message.email+ '  :  ' + message.text + '</p></li>');
            }else{
                $('.messages').append('<li class="them"><p>'+message.email+ '  :  ' + message.text + '</p></li>');   
            }
      });
    
//    $scope.chat.$loaded().then(function () {
//            console.log("record ID:", $scope.chat.chat);
//            if ($scope.chat.chat.name == $scope.userdata.uid) {
//                $('.messages').append('<li class="us"><p>' + $scope.chat.chat.text + '</p></li>');
//            }else{
//                $('.messages').append('<li class="them"><p>' + $scope.chat.chat.text + '</p></li>');   
//            }
//        });


    //        var ref = new Firebase('https://blinding-heat-5568.firebaseio.com/');
    //        var sync = $firebase(ref);
    //        $scope.messages = sync.$asArray();
    //    console.log($scope.messages);
    $scope.send = function (chat) {

        FireBaseServices.update($scope.userdata.uid,$scope.userdata.password.email, chat.message);
        $scope.chat = FireBaseServices.chat();
//        $scope.chat.$loaded().then(function () {
//            console.log("record ID:", $scope.chat.chat);
//            if ($scope.chat.chat.name == $scope.userdata.uid) {
//                $('.messages').append('<li class="us"><p>' + $scope.chat.chat.text + '</p></li>');
//            }else{
//                $('.messages').append('<li class="them"><p>' + $scope.chat.chat.text + '</p></li>');   
//            }
//        });

        // Update the scroll area
        $ionicScrollDelegate.scrollBottom(true);
    };
});