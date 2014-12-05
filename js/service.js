var firebaseservices = angular.module('firebaseservices', ['firebase'])

.factory('FireBaseServices', function ($http, $location, $firebase) {

    var ref = new Firebase("https://blinding-heat-5568.firebaseio.com/");
//    var val = 0;
    return {
        getuseremail: function () {
            return useremail;
        },
        setuseremail: function (user) {
            useremail = user;
        },
        normallogin: function (username, password) {
            //    var auth = $firebaseAuth(ref);
            ref.authWithPassword({
                email: username,
                password: password
            }, function (error, authData) {
                if (error === null) {
//                    return authData;
                    $.jStorage.set("user",authData);
                } else {
                    console.log("Error authenticating user:", error);
                }
            });

        },
        normalregister: function (username, password) {

            ref.createUser({
                email: username,
                password: password
            }, function (error) {
                if (error === null) {
                    console.log("User created successfully");
                } else {
                    console.log("Error creating user:", error);
                }
            });

        },
        authenticate: function () {
            return ref.getAuth();
        },
        update: function (name,email,text) {
            var obj={};
            obj['chat']={name:name,text:text,email:email};
            ref.update(obj);
        },
        chat: function () {
            var sync = $firebase(ref);
            return sync.$asObject();
//            var val=0;
//            ref.once('value', function(nameSnapshot) {
//                 var val = nameSnapshot.val();
//
//            });
//            console.log(val);
        },
        setuser: function (userdata) {
            var user = userdata;
            $.jStorage.set("user", userdata);
        },
        getuser: function () {
            return $.jStorage.get("user");
        }
    }
});