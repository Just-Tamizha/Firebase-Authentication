// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signInAnonymously,onAuthStateChanged,signInWithPopup,GoogleAuthProvider,signOut } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMidVAtJ_Yby3F37WSyUONZlHzgDtSe3U",
  authDomain: "tamizha-crews.firebaseapp.com",
  projectId: "tamizha-crews",
  storageBucket: "tamizha-crews.appspot.com",
  messagingSenderId: "54502209492",
  appId: "1:54502209492:web:e8e09f867261516d090841"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
const auth=getAuth(app);

// Elements
var email=document.getElementById('getEmail');
var password=document.getElementById('getPassword');
var createAccountButton=document.getElementById('createAccountButton');
var signInButton=document.getElementById('signInButton');
var signInGoogle=document.getElementById('signInGoogle')
var signOutButton=document.getElementById('signOutButton');
var signInAnon=document.getElementById('signInAnon');
var signInDiv=document.getElementById('signIn');
var userName=document.getElementById('userName');
var signOutDiv=document.getElementById('signOut');
// var getResults=document.getElementById('getResults');

// onAuthStateChanged
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        userName.hidden=false
        userName.innerHTML="USER ID : "+uid
        // getResults.innerHTML="SignIn Successfully"
        // getResults.hidden=false
        signInDiv.hidden=true
        signOutDiv.hidden=false
        // alert(uid)
    } else {
        // getResults.hidden=false
        signInDiv.hidden=false
        signOutDiv.hidden=true
    }
});

// Create User
createAccountButton.onclick=()=>{
    createUserWithEmailAndPassword(auth,email.value, password.value)
    .then((userCredential) => {
        // Signed in 
        // getResults.innerHTML="Account created"
        // getResults.hidden=false
    })
    .catch((error) => {
        // Error
        // getResults.innerHTML=error.message;
        // getResults.hidden=false
    });
}

// SignIn User
signInButton.onclick=()=>{
    signInWithEmailAndPassword(auth,email.value, password.value)
    .then((userCredential) => {
        // Signed in 
        userName.hidden=false
        userName.innerHTML="USER ID : "+userCredential.user.uid
        // getResults.innerHTML="SignIn Successfully"
        // getResults.hidden=false
        signInDiv.hidden=true
        signOutDiv.hidden=false
    })
    .catch((error) => {
        // Error
        // getResults.innerHTML=error.message;
        // getResults.hidden=false
    });
}

// SignIn Anonymous
signInAnon.onclick=()=>{
    
    signInAnonymously(auth)
    .then((userCredential)=>{
        // Signed in 
        userName.hidden=false
        userName.innerHTML="User ID : "+userCredential.user.uid
        // getResults.innerHTML="SignIn Successfully"
        // getResults.hidden=false
        signInDiv.hidden=true
        signOutDiv.hidden=false
    })
    .catch((error) => {
        // Error
        // getResults.innerHTML=error.message;
        // getResults.hidden=false
      });
}

// SignIn With Google
signInGoogle.onclick=()=>{
    const provider = new GoogleAuthProvider();
    var userName=document.getElementById('userName');
    signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    userName.hidden=false
    userName.innerHTML="User ID : "+user.uid
    // getResults.innerHTML="SignIn Successfully"
    // getResults.hidden=false
    signInDiv.hidden=true
    signOutDiv.hidden=false
    // ...
    }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // getResults.innerHTML=error.message;
    // getResults.hidden=false
    // ...
    });
}

// Sign Out
signOutButton.onclick=()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        userName.hidden=false
        // getResults.innerHTML="SignOut Successfully"
        // getResults.hidden=false
        signInDiv.hidden=false
        signOutDiv.hidden=true
      }).catch((error) => {
        // An error happened.
        // getResults.innerHTML=error.message;
        // getResults.hidden=false
      });
}
