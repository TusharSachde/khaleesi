var adminurl = "http://localhost/sergybackend/index.php/json/";
//var adminurl = "http://mafiawarloots.com/sergybackend/index.php/json/";

var myservices = angular.module('myservices', [])

.factory('MyServices', function ($http, $location) {
    
    var useremail = "";
    var uservalue = {};
    return {
        getuseremail: function () {
            return useremail;
        },
        setuseremail: function (user) {
            useremail = user;
        }
    }
});