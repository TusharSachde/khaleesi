var firebaseservices = angular.module('firebaseservices', ['firebase'])

.factory('FireBaseServices', function ($http, $location, $firebase) {

    var ref = new Firebase("https://blinding-heat-5568.firebaseio.com/");
//    var FBService = this;
//    console.log(this);
//    ref.on('child_changed', function (snapshot) {
//        var message = snapshot.val();
//        console.log(message);
//        console.log(firebaseservices.authenticate());
//    });

    //    var val = 0;
    return {
        getuseremail: function () {
            return useremail;
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
            return ref.getAuth();
        },
        update: function (name, email, text) {
            var obj = {};
            obj['chat'] = {
                name: name,
                text: text,
                email: email
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
});