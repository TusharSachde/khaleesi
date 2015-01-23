// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'firebaseservices'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
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

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
    //APP
    $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html"
        })
        .state('app.chat', {
            url: "/chat",
            views: {
                'menuContent': {
                    templateUrl: "templates/chat.html",
                    controller: 'ChatCtrl'
                }
            }
        })
        .state('login', { //logins
            url: "/login",
            templateUrl: "templates/login.html",
            controller: 'LoginCtrl'

        })
        .state('logout', { //Logout
            url: "/logout",
            templateUrl: "templates/login.html",
            controller: 'LogoutCrtl'

        })
        .state('tab', { //tabs
            url: '/tab',
            abstract: true,
            templateUrl: "templates/tabs.html"
        })
        .state('tab.travel', {
            url: '/travel',
            views: {
                'tab-travel': {
                    templateUrl: "templates/tab-travel.html",
                    controller: 'TravelCtrl'
                }
            }
        })
        .state('tab.placeorder', {
            url: '/placeorder/:id',
            views: {
                'tab-travel': {
                    templateUrl: "templates/tab-placeorder.html",
                    controller: 'PlaceOrderCtrl'
                }
            }
        })
        .state('tab.hotel', {
            url: '/hotel',
            views: {
                'tab-hotel': {
                    templateUrl: "templates/tab-hotel.html",
                    controller: 'HotelCtrl'
                }
            }
        })
        .state('tab.good', {
            url: '/good',
            views: {
                'tab-travel': {
                    templateUrl: "templates/tab-travel.html",
                    controller: 'GoodCtrl'
                }
            }
        })
        .state('tab.show', {
            url: '/show',
            views: {
                'tab-hotel': {
                    templateUrl: "templates/tab-travel.html",
                    controller: 'ShowCtrl'
                }
            }
        })
        .state('tab.bill', {
            url: '/bill',
            views: {
                'tab-hotel': {
                    templateUrl: "templates/tab-travel.html",
                    controller: 'BillCtrl'
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
    .filter('chatclass', function (FireBaseServices) {
        return function (input) {
            useremail = FireBaseServices.getauthemail();
            if (input == "Sergy") {
                return "them";
            } else {
                return "us";
            }

        };
    })

.filter('imagepath', function () {
    return function (input) {
        if (input == "") {
            return "http://mafiawarloots.com/sergybackend/assets/img/default.jpg";
//                return "http://localhost/sergybackend/assets/img/default.jpg";
        } else {
            return "http://mafiawarloots.com/sergybackend/uploads/" + input;
//            return "http://localhost/sergybackend/uploads/" + input;
        }
    };
})

.filter('chatt', function () {
    return function (input) {
        var j = JSON.parse(input);
        console.log(j.form);return j.form;
    };
})

.directive("chat", function () {
    return {
        restrict: "E",
        replace: "true",
        templateUrl: "templates/chat1.html"
    }
});
var formvalidation = function(allvalidation) {
            var isvalid2 = true;
            for (var i = 0; i < allvalidation.length; i++) {
                console.log("checking");
                console.log(allvalidation[i].field);
                if (allvalidation[i].field == "" || !allvalidation[i].field) {
                    allvalidation[i].validation = "ng-dirty";
                    isvalid2 = false;
                }
            }
            return isvalid2;
        };