const firebaseConfig = {
  apiKey: "AIzaSyBJGVY69o_wcZ0ki7dk-0fvwMhAdcy6EV0",
  authDomain: "liftingsessiontracker.firebaseapp.com",
  projectId: "liftingsessiontracker",
  storageBucket: "liftingsessiontracker.appspot.com",
  messagingSenderId: "467406004880",
  appId: "1:467406004880:web:428eca864648ba6c4b6e15",
  measurementId: "G-5TRT5FZ9LP"
};

class Exercise {
  constructor(name, weight, sets, reps, rpe, desc) {
    this.name = name;
    this.weight = weight;
    this.sets = sets;
    this.reps = reps;
    this.rpe = rpe;
    this.desc = desc;
  }
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
var date = new Date();
var sessionID = '';

// Sign In
function userSignIn() {
  // var email = document.getElementById('email');
  // var password = document.getElementById('password');
  var email = 'l@email.com';
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
  var email = 'l@email.com';
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

function newSession() {
  var currDate = date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear();
  var user = firebase.auth().currentUser;
  var docRef = db.collection('sessions');
  docRef.add({
    email: user.email,
    date: currDate,
  })
    .then((docRef) => {
      sessionID = docRef.id;
      console.log('new session: ', sessionID);
    })
    .catch((error) => {
      console.error('error: ', error);
    });

}


function newExercise() {
  let name = document.getElementById('name').value;
  let weight = document.getElementById('weight').value;
  let sets = document.getElementById('sets').value;
  let reps = document.getElementById('reps').value;
  let rpe = document.getElementById('rpe').value;
  let desc = document.getElementById('desc').value;
  console.log(this.sessionID);

  var exerciseDocRef = db.collection('exercises')
  exerciseDocRef.add({
    sessionID: sessionID,
    name: name,
    weight: weight,
    sets: sets,
    reps: reps,
    rpe: rpe,
    desc: desc,
  })
}

function addData() {
  var d = date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear();
  var user = firebase.auth().currentUser;
  var temp;
  var exercises = [
    new Exercise('Bench Press', 225, 1, 1, 8.5, 'Paused 2ct'),
    new Exercise('Overhead Press', 90, 3, 8, 0, ''),
    new Exercise('DB Incline Press', 45, 3, 10, 0, ''),
  ];

  var sessionDocRef = db.collection('sessions');

  sessionDocRef.add({
    email: user.email,
    date: d,
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      temp = docRef.id;
      console.log('test: ', sessionDocRef.id);
      for (var i = 0; i < exercises.length; i++) {
        db.collection('exercises').add({
          sessionID: temp,
          name: exercises[i].name,
          weight: exercises[i].weight,
          sets: exercises[i].sets,
          reps: exercises[i].reps,
          rpe: exercises[i].rpe,
          desc: exercises[i].desc,
        })
          .then((exerciseDocRef) => {
            console.log("Exercise doc written with ID: ", exerciseDocRef.id);
          })
          .catch((exerciseDocError) => {
            console.error("Error adding exercise document: ", exerciseDocError);
          });
      }
    })
    .catch((sessionDocError) => {
      console.error("Error adding document: ", sessionDocError);
    });

}