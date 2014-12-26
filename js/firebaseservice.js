var adminurl = "http://localhost/sergybackend/index.php/json/";
//var adminurl = "http://mafiawarloots.com/sergybackend/index.php/json/";
var firebaseservices = angular.module('firebaseservices', ['firebase'])

.factory('FireBaseServices', function ($http, $location, $firebase) {

    
//     var db = openDatabase('Sergy', '1.0', 'Books Database', 2 * 1024 * 1024);
//
//
//
//
//    db.transaction(function (tx) {
//        tx.executeSql('CREATE TABLE IF NOT EXISTS chatmessages (id INTEGER PRIMARY KEY, chat,user,timestamp,type,url,imageurl,status,json)');
//        
//         
//
//        
//        //        tx.executeSql('INSERT INTO BETS (id, book,favorite,backlay,stake,odds) VALUES (1,1,2,2,0.3,100)');
//
//        //            tx.executeSql('SELECT last_insert_rowid()',callback);
//        //            getlast();
//        //            tx.executeSql('SELECT last_insert_rowid()', [], function (tx, results) {
//        //                console.log(results.rows.item(0));
//        //                });
//    });
    
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
        logout: function (callback) {
            ref.unauth();
            $.jStorage.flush();
            callback();
        },
        checklogin: function() {
            if($.jStorage.get('user'))
            {
                console.log("Loggedin");
                return true;
            }
            else
            {
                console.log("Not Loggedin");
                return false;
            }
        },
        setuserid: function (user) {
            
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
        getchatbyuser: function (email) {
            return $http({
                url: adminurl+'getchatbyuser',
                method: "POST",
               data: {'email':email}
            });
            
        },
        login: function (username, password) {
//            return $http.get(adminurl + "login?email="+username+"&password="+password,{});
            return $http({
                url: adminurl+'login',
                method: "POST",
               data: {'email':username,
                      'password':password}
            });
            
        },
        adduser: function (name,username, password) {
//            return $http.get(adminurl + "register?name="+name+"&email="+username+"&password="+password+"&socialid="+0+"&logintype=3&json=",{});
            return $http({
                url: adminurl+'register',
                method: "POST",
               data: {'name':name,
                      'email':username,
                      'password':password,
                      'socialid':'',
                      'logintype':3,
                      'json':''
                     }
            });
            
        },
        normalregister: function (username, password, callback,oncancel) {
            
            // User to database `user`
//            $http.get(adminurl + 'addchat?user=' + bigbagplan.user + '&category=' + bigbagplan.category, {});
            
            ref.createUser({
                email: username,
                password: password
            }, callback,oncancel);

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
            
            
//            return $http({
//                url: adminurl+'addchat',
//                method: "POST",
//               data: {'json':json1,
//                      'user':id,
//                      'type':'1',
//                      'url':'',
//                      'imageurl':'',
//                      'status':'1'}
//            });
            
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