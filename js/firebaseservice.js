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
    //        tx.executeSql('INSERT INTO BETS (id, book,favorite,backlay,stake,odds) VALUES (1,1,2,2,0.3,100)');
    //            tx.executeSql('SELECT last_insert_rowid()',callback);
    //            getlast();
    //            tx.executeSql('SELECT last_insert_rowid()', [], function (tx, results) {
    //                console.log(results.rows.item(0));
    //                });
    //    });
    var ref = new Firebase("https://blinding-heat-5568.firebaseio.com/");
    var chats = [];
    var onchangecallback = function () {};
    var newfun = function () {};
    var message = [];
    var authdetails = ref.getAuth();
    var chatmessage = [];
    chatmessage.message = '';
    chatmessage.id = 0;

    var val = 0;


    var returnval = {
        firbasecallonchange: function (callback, callback1) {
            ref.child(authdetails.uid).off('value');
            ref.child(authdetails.uid).on('value', function (snapshot) {
                console.log("firbasecallonchange firbasecallonchange firbasecallonchange firbasecallonchange firbasecallonchange");
                message = snapshot.val();
                console.log(message);
                if (chats != '') {
                    if (chats[0].text != message.text) {
                        chats.push(message);
                    }
                } else {
                    chats.push(message);
                }
                callback();
                onchangecallback(message);
            });
            ref.child("sergy").on('value', function (snapshot) {
                console.log("on sergy change");

                callback1(snapshot.val());

            });
            
        },
        getchats: function () {
            console.log("chat in firebase");
            console.log(chats.length);
            return chats;
        },
        setmessage: function (data, id) {
            chatmessage.message = data;
            chatmessage.id = id;
        },
        getmessage: function () {
            return chatmessage;
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
            ref.child(authdetails.uid).off('value');
            ref.unauth();
            $.jStorage.flush();
            chats = [];
            callback();
        },
        checklogin: function () {
            if ($.jStorage.get('user')) {
                console.log("Loggedin");
                return true;
            } else {
                console.log("Not Loggedin");
                return false;
            }
        },
        setuserid: function (user) {

            authdetails = ref.getAuth();
            var userdata = {
                'id': user,
                'provider': authdetails.provider,
                'uid': authdetails.uid
            };
            $.jStorage.set("user", userdata);
        },
        normallogin: function (username, password, callback, oncancel) {
            //    var auth = $firebaseAuth(ref);
            ref.authWithPassword({
                email: username,
                password: password
            }, callback, oncancel);




        },
        getchatbyuser: function (email, newchat) {
            chats = [];
            console.log("GET CHAT BY USER CALLED");
            $http({
                url: adminurl + 'getchatbyuser',
                method: "POST",
                data: {
                    'email': email
                }
            }).success(function (data, status) {
                chats = [];
                for (var i = 0; i < data.queryresult.length; i++) {
                    chats.push(JSON.parse(data.queryresult[i].json));
                    //                    chats[i].statuss=data.queryresult[i].status;
                    //console.log("chats in get chat by user");
                    //console.log(chats);

                }
                newchat();
            });

        },
        login: function (username, password) {
            //            return $http.get(adminurl + "login?email="+username+"&password="+password,{});
            return $http({
                url: adminurl + 'login',
                method: "POST",
                data: {
                    'email': username,
                    'password': password
                }
            });

        },
        adduserform: function (formid, user, json) {
            //            return $http.get(adminurl + "login?email="+username+"&password="+password,{});
            return $http({
                url: adminurl + 'adduserform',
                method: "POST",
                data: {
                    'formid': formid,
                    'user': user,
                    'json': json
                }
            });

        },
        placeorder: function (form) {
            console.log(form);
            return $http({
                url: adminurl + 'createfrontendorder',
                method: "POST",
                data: {
                    'user': form.user,
                    'address1': form.address1,
                    'address2': form.address2,
                    'city': form.city,
                    'state': form.state,
                    'pincode': form.pincode,
                    'email': form.email,
                    'contactno': form.contactno,
                    'country': form.country,
                    'shippingaddress1': form.shipaddress1,
                    'shippingaddress2': form.shipaddress2,
                    'shipcity': form.shipcity,
                    'shipstate': form.shipstate,
                    'shippingcode': form.shippingcode,
                    'shipcountry': form.shipcountry,
                    'trackingcode': form.trackingcode,
                    'shippingcharge': form.shippingcharge,
                    'shippingmethod': form.shippingmethod,
                    'productid': form.productid
                }
            });

        },
        updateorderbyorderid: function (form) {
            console.log(form);
            return $http({
                url: adminurl + 'updateorderbyorderid',
                method: "POST",
                data: {
                    'order': form.order,
                    'address1': form.address1,
                    'address2': form.address2,
                    'city': form.city,
                    'state': form.state,
                    'pincode': form.pincode,
                    'email': form.email,
                    'contactno': form.contactno,
                    'country': form.country,
                    'shippingaddress1': form.shipaddress1,
                    'shippingaddress2': form.shipaddress2,
                    'shipcity': form.shipcity,
                    'shipstate': form.shipstate,
                    'shippingcode': form.shippingcode,
                    'shipcountry': form.shipcountry,
                    'trackingcode': form.trackingcode,
                    'shippingcharge': form.shippingcharge,
                    'shippingmethod': form.shippingmethod
                }
            });

        },
        adduserproduct: function (productid, user, json) {
            return $http({
                url: adminurl + 'adduserproduct',
                method: "POST",
                data: {
                    'productid': productid,
                    'user': user,
                    'json': json
                }
            });

        },
        updateshippingdetails: function (user, shipping) {
            return $http({
                url: adminurl + 'updateshippingdetails',
                method: "POST",
                data: {
                    'user': user,
                    'shippingaddress1': shipping.shipaddress1,
                    'shippingaddress2': shipping.shipaddress2,
                    'shipcity': shipping.shipcity,
                    'shipstate': shipping.shipstate,
                    'shippingcode': shipping.shippingcode,
                    'shipcountry': shipping.shipcountry,
                    'trackingcode': shipping.trackingcode,
                    'shippingcharge': shipping.shippingcharge,
                    'shippingmethod': shipping.shippingmethod
                }
            });

        },
        updatebillingdetails: function (user, billing) {
            return $http({
                url: adminurl + 'updatebillingdetails',
                method: "POST",
                data: {
                    'user': user,
                    'address1': billing.address1,
                    'address2': billing.address2,
                    'city': billing.city,
                    'state': billing.state,
                    'pincode': billing.pincode,
                    'email': billing.email,
                    'contactno': billing.contactno,
                    'country': billing.country,
                    'trackingcode': billing.trackingcode
                }
            });

        },
        adduser: function (name, username, password) {
            //            return $http.get(adminurl + "register?name="+name+"&email="+username+"&password="+password+"&socialid="+0+"&logintype=3&json=",{});
            return $http({
                url: adminurl + 'register',
                method: "POST",
                data: {
                    'name': name,
                    'email': username,
                    'password': password,
                    'socialid': '',
                    'logintype': 3,
                    'json': ''
                }
            });

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
        getordersbyuserid: function (id, search, pageno, status) {
            return $http.get(adminurl + "getordersbyuserid?id=" + id + "&search=" + search + "&pageno=" + pageno + "&status=" + status, {});
        },
        getorderbyorderid: function (id) {
            return $http.get(adminurl + "getorderbyorderid?orderid=" + id, {});
        },
        getproductbyid: function (id) {
            return $http.get(adminurl + "getproductbyid?id=" + id, {});
        },
        getproductbycategoryid: function (id) {
            return $http.get(adminurl + "getproductbyid?id=" + id, {});
        },
        getuserbyuserid: function (id) {
            return $http.get(adminurl + "getuserbyuserid?id=" + id, {});
        },
        getlastorder: function (id) {
            return $http.get(adminurl + "getlastorder?id=" + id, {});
        },
        authenticate1: function () {
            return $http.get(adminurl + "authenticate", {});
        },
        update: function (name, email, text, id, type, newfun) {
            var obj = {};
            var timestamp = new Date();

            if (type == 1) {
                obj[authdetails.uid] = {
                    name: name,
                    text: text,
                    textcheck: message.textcheck + 1,
                    email: email,
                    timestamp: timestamp.getTime()
                };
                ref.update(obj);

                newfun();

                //            

                var json1 = {
                    email: email,
                    name: name,
                    text: text,
                    timestamp: timestamp.getTime()
                };
                json1 = JSON.stringify(json1);

            }

            if (type == 5) {

                obj[authdetails.uid] = {
                    name: name,
                    text: JSON.stringify(text),
                    textcheck: message.textcheck + 1,
                    email: email,
                    timestamp: timestamp.getTime(),
                    type: type
                };
                ref.update(obj);

                newfun();

                //            

                var json1 = {
                    email: email,
                    name: name,
                    text: JSON.stringify(text),
                    timestamp: timestamp.getTime(),
                    type: type
                };
                json1 = JSON.stringify(json1);

            }

            $http.get(adminurl + "addchat?json=" + json1 + "&user=" + id + "&type=1&url=&imageurl=&status=1", {});

        },
        setuser: function (userdata) {

        },
        getuser: function () {
            return $.jStorage.get("user");
        }
    }

    if (authdetails) {
        // returnval.firbasecallonchange();
    }
    return returnval;
});