var db = firebase.firestore();


function handleSignIn() {
  if (firebase.auth().currentUser) { //if a user is currently logged in
    firebase.auth().signOut();

  } else {
    var email = document.getElementById('loginEmail').value; //get email value
    var password = document.getElementById('loginPwd').value; //get password value
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function () {

        //Succesful, do whatever you want in your page
        window.location.href = "home.html";

      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('You have entered a wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error); //output error in the console
        document.getElementById('loginBtn').disabled = false;
        // [END_EXCLUDE]
      });
    // [END authwithemail]
    // document.getElementById('loginBtn').disabled = true;
  }
}
//function for signOut Btn

function handleSignOut() {
  firebase.auth().signOut();
  window.location = 'index.html';
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('signUpEmail').value;
  var password = document.getElementById('signUpPwd').value;
  var uname = document.getElementById("signUpName").value;
  if (email.length < 4) {
    alert('Please enter a valid email address.');
    return;
  }
  if (email.length = 0) {
    alert("Email cannot be blank, please enter an email.")
    return;
  }
  if (password.length < 4) {
    alert('Your password is too weak, enter a strong password.');
    return;
  }
  // Create user with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (data) {
      // get user data from the auth trigger
      const userUid = data.user.uid; // The UID of the user.
      const email = data.user.email; // The email of the user.
      const displayName = uname; // The display name of the user.

      // console.log("User details: " + data.user);
      // console.log("UserID: " + data.user.uid);
      // set account  doc  
      const account = {
        useruid: userUid,
        useremail: email,
        name: displayName
      }
      // firebase.firestore().collection('users').doc(email).set(account);
      // alert("Your account has been created successfully with user email: " + email);
      // // window.open('index.html', '_self');

      firebase.firestore().collection('users').doc(email).set(account).then(function () {
        alert("Document successfully written!  Your account has been created successfully with user email: " + email);
        window.open('index.html', '_self');
      }).catch(function () {
        alert("Document on write failed!");
      });

    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
}

/**
 * Sends an email verification to the user.
 */
// function sendEmailVerification() {
//   // [START sendemailverification]
//   firebase.auth().currentUser.sendEmailVerification().then(function () {
//     // Email Verification sent!
//     // [START_EXCLUDE]
//     alert('Email Verification Sent!');
//     // [END_EXCLUDE]
//   });
//   // [END sendemailverification]
// }

// function sendPasswordReset() {
//   var email = document.getElementById('email').value;
//   // [START sendpasswordemail]
//   firebase.auth().sendPasswordResetEmail(email).then(function () {
//     // Password Reset Email Sent!
//     // [START_EXCLUDE]
//     alert('Password Reset Email Sent!');
//     // [END_EXCLUDE]
//   }).catch(function (error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // [START_EXCLUDE]
//     if (errorCode == 'auth/invalid-email') {
//       alert(errorMessage);
//     } else if (errorCode == 'auth/user-not-found') {
//       alert(errorMessage);
//     }
//     console.log(error);
//     // [END_EXCLUDE]
//   });
//   // [END sendpasswordemail];
// }

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      // User is signed out.
      firebase.auth().signOut();

    } else {
      // User is signed in.
      // var displayName = user.displayName;
      // var email = user.email;
      // var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
      // var providerData = user.providerData;
      // // [START_EXCLUDE]
      // document.getElementById('loginBtn-status').textContent = 'Signed in';
      // document.getElementById('loginBtn').textContent = 'Sign out';
      // document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      // if (!emailVerified) {
      //   document.getElementById('quickstart-verify-email').disabled = false;
      // }
      // [END_EXCLUDE]
    }
  });
  // [END authstatelistener]

  // document.getElementById('loginBtn').addEventListener('click', handleSignIn, false);
  // document.getElementById('logoutBtn').addEventListener('click', handleSignOut, false);
  // document.getElementById('signupBtn').addEventListener('click', handleSignUp, false);
  // document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
  // document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}

// window.onload = function () {
//   initApp();
// };