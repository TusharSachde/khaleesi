// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'firebaseservices'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

        .state('app.chat', {
            url: "/chat",
            views: {
                'menuContent': {
                    templateUrl: "templates/chat.html",
                    controller: 'ChatCtrl'
                },
                'menuContent2': {
                    templateUrl: "templates/chat.html",
                    controller: 'ChatCtrl'
                },
                'menuContent3': {
                    templateUrl: "templates/chat.html",
                    controller: 'ChatCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/chat');
})

    
.filter('converttime', function (FireBaseServices) {
    return function (input) {
        input = parseInt(input);
        var date = new Date(input);
        return date.toUTCString();
    };
})
    .filter('chatclass', function(FireBaseServices) {
        return function(input) {
            useremail = FireBaseServices.getauthemail();
            if (input == "Sergy") {
                return "them";
            } else {
                return "us";
            }

        };
    })

.filter('chatt', function () {
    return function (input) {
        var j = JSON.parse(input);
        return j.form;
    };
})

.directive("chat", function () {
    return {
        restrict: "E",
        replace: "true",
        templateUrl: "templates/chat1.html"
    }
});