function register() {
    console.log($('#email').val());
    console.log($('#password').val());
    ref = new Firebase('https://blinding-heat-5568.firebaseio.com/');
    ref.createUser({
        email: $('#email').val(),
        password: $('#password').val()
    }, function (error) {
        if (error === null) {
            console.log("User created successfully");
        } else {
            console.log("Error creating user:", error);
        }
    });
}

var ref= new Firebase('https://blinding-heat-5568.firebaseio.com/');

function login() {
//    console.log($('#loginemail').val());
//    console.log($('#loginpassword').val());
    ref = new Firebase('https://blinding-heat-5568.firebaseio.com/');
    ref.authWithPassword({
        email: $('#loginemail').val(),
        password: $('#loginpassword').val()
    }, function (error, authData) {
        if (error === null) {
//             user authenticated with Firebase
//            console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
            return authData.uid;
        } else {
            console.log("Error authenticating user:", error);
            return false;
        }
    });
}