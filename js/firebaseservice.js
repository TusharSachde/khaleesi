var adminurl = "http://localhost/sergybackend/index.php/json/";
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
                console.log(message);
//                json1=JSON.stringify(message);
//            
//                $http.get(adminurl + "addchat?json="+json1+"&user=0&type=1&url=&imageurl=&status=1",{});
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
            $.jStorage.flush();
            return 1;

        },
        setuserid: function (user) {
            console.log("me user");
            console.log(user);
            authdetails = ref.getAuth();
            var userdata = {
                'id' : user,
                'provider' : authdetails.provider,
                'uid' : authdetails.uid
            };
            $.jStorage.set("user", userdata);
        },
        normallogin: function (username, password, callback) {
            //    var auth = $firebaseAuth(ref);
            ref.authWithPassword({
                email: username,
                password: password
            }, callback);

        },
        login: function (username, password) {
            return $http.get(adminurl + "login?email="+username+"&password="+password,{});
            
        },
        adduser: function (name,username, password) {
            return $http.get(adminurl + "register?name="+name+"&email="+username+"&password="+password+"&socialid="+0+"&logintype=3&json=",{});
            
        },
        normalregister: function (username, password, callback) {
            
            // User to database `user`
//            $http.get(adminurl + 'addchat?user=' + bigbagplan.user + '&category=' + bigbagplan.category, {});
            
            ref.createUser({
                email: username,
                password: password
            }, callback);

        },
        authenticate: function () {
            authdetails = ref.getAuth();
            return authdetails;
        },
        authenticate1: function () {
            return $http.get(adminurl + "authenticate",{});
        },
        update: function (name, email, text, id) {
            var obj = {};
            var timestamp = new Date();
            obj[authdetails.uid] = {
                name: name,
                text: text,
                email: email,
                timestamp: timestamp.getTime()
            };
            ref.update(obj);
//            
            var json1 = {
                email: email,
                name: name,
                text: text,
                timestamp: timestamp.getTime()
            };
            json1=JSON.stringify(json1);
            
            $http.get(adminurl + "addchat?json="+json1+"&user="+id+"&type=1&url=&imageurl=&status=1",{});
            
        },
        setuser: function (userdata) {
            
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