const firebaseConfig = {
    apiKey: "AIzaSyBJGVY69o_wcZ0ki7dk-0fvwMhAdcy6EV0",
    authDomain: "liftingsessiontracker.firebaseapp.com",
    projectId: "liftingsessiontracker",
    storageBucket: "liftingsessiontracker.appspot.com",
    messagingSenderId: "467406004880",
    appId: "1:467406004880:web:428eca864648ba6c4b6e15",
    measurementId: "G-5TRT5FZ9LP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Sign In
function userSignIn() {
    // var email = document.getElementById('email');
    // var password = document.getElementById('password');
    var email = 'email@email.com';
    var password = 'password';

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            alert('successfully logged in');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage + ' error code: ' + error.code);
        });
}

function userSignOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log('logged out successfully');
      }).catch((error) => {
        console.log('not logged in');
      });
}

// Register Account
function userSignUp() {
    var email = 'email@email.com';
    var password = 'password';
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage + ' error code: ' + error.code);

    });
}

