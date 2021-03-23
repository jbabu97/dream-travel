import firebase from "firebase/app";
import firebaseConfig from "../../firebase.config";
import "firebase/auth";

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

// handle google Login
export const handleGoogleLogin = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, email } = res.user;
      const signedInCustomer = {
        isSignedIn: true,
        name: displayName,
        email: email,
        success: true,
      };
      return signedInCustomer;
    })
    .catch((error) => {
      const errorMessage = error.message;
      return errorMessage;
    });
};

// create customer with email and password

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newCustomerInfo = res.user;
      newCustomerInfo.error = "";
      newCustomerInfo.success = true;
      updateCustomerName(name);
      return newCustomerInfo;
    })
    .catch((error) => {
      const newCustomerInfo = { };
      newCustomerInfo.error = error.message;
      newCustomerInfo.success = false;
      return newCustomerInfo;
    });
};

// login with email & password
export const logInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newCustomerInfo = res.user;
      newCustomerInfo.error = "";
      newCustomerInfo.success = true;
      return(newCustomerInfo);
    })
    .catch((error) => {
      const newCustomerInfo = {};
      newCustomerInfo.error = error.message;
      newCustomerInfo.success = false;
      return(newCustomerInfo);
    });
};

// update customer name
const updateCustomerName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name
    })
    .then(() => {
      console.log("user name updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
