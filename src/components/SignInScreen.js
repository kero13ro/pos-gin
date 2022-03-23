import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnWaDVh7Bf1ULWHEM-UymP3A20DQqar2k",
  authDomain: "sheet1218.firebaseapp.com",
  projectId: "sheet1218",
  storageBucket: "sheet1218.appspot.com",
  messagingSenderId: "37357675998",
  appId: "1:37357675998:web:e9099b775e2ee96887694f",
};
firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver();
  }, []);

  const LoginPop = () => {
    return (
      <>
        <p>請先登入(測試版本可略過)</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </>
    );
  };

  const Welcome = () => {
    return (
      <>
        <p>歡迎 {firebase.auth().currentUser.displayName}!</p>
        <a onClick={() => firebase.auth().signOut()}>登出</a>
      </>
    );
  };

  return (
    <div id="SignInScreen" className="container">
      {!isSignedIn ? <LoginPop /> : <Welcome />}
    </div>
  );
}

export default SignInScreen;
