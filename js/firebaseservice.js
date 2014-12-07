var firebaseservices = angular.module('firebaseservices', ['firebase'])

.factory('FireBaseServices', function ($http, $location, $firebase) {

    var ref = new Firebase("https://blinding-heat-5568.firebaseio.com/");
    var chats = [];
    var onchangecallback = function () {};

    var authdetails = ref.getAuth();

    var val = 0;


    var returnval = {
        firbasecallonchange: function () {
            ref.child(authdetails.uid).on('value', function (snapshot) {
                var message = snapshot.val();
                chats.push(message);
                onchangecallback(message);
            });
        },
        getchats: function () {
            return chats;
        },
        changecallback: function (newfunc) {
            onchangecallback = newfunc;
            return true;
        },
        getuseremail: function () {
            return useremail;
        },

        getauthemail: function () {
            return authdetails.password.email;
        },

        logout: function () {

            ref.unauth();
            return 1;

        },
        setuseremail: function (user) {
            useremail = user;
        },
        normallogin: function (username, password, callback) {
            //    var auth = $firebaseAuth(ref);
            ref.authWithPassword({
                email: username,
                password: password
            }, callback);

        },
        normalregister: function (username, password, callback) {

            ref.createUser({
                email: username,
                password: password
            }, callback);

        },
        authenticate: function () {
            authdetails = ref.getAuth();
            return authdetails;
        },
        update: function (name, email, text) {
            var obj = {};
            var timestamp = new Date();
            obj[authdetails.uid] = {
                name: name,
                text: text,
                email: email,
                timestamp: timestamp.getTime()
            };
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

    if (authdetails) {
        returnval.firbasecallonchange();
    }
    return returnval;
});