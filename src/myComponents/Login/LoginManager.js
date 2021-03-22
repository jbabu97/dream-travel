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
  console.log("google clicked");

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
      // setCustomer(isSignedIn);
      // history.replace(from);
      // console.log(isSignedIn);
    })
    .catch((error) => {
      const errorMessage = error.message;
      return errorMessage;
      // setCustomer(errorMessage);
      console.log(errorMessage);
    });
};

//   handle log out
export const handleLogOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        error: "",
        success: false,
      };
      return signedOutUser;
    })
    .catch((error) => {
      const newCustomerInfo = { };
      newCustomerInfo.error = error.message;
      newCustomerInfo.success = false;
      // setCustomer(newCustomerInfo);
      return newCustomerInfo;
    });
};

// create customer with email and password

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res);
      const newCustomerInfo = res.user;
      newCustomerInfo.error = "";
      newCustomerInfo.success = true;
      // setCustomer(newCustomerInfo);
      updateCustomerName(name);
      return newCustomerInfo;
    })
    .catch((error) => {
      const newCustomerInfo = { };
      newCustomerInfo.error = error.message;
      newCustomerInfo.success = false;
      // setCustomer(newCustomerInfo);
      return newCustomerInfo;
    });
};

// login with email & password
export const logInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res);
      const newCustomerInfo = res.user;
      newCustomerInfo.error = "";
      newCustomerInfo.success = true;
      return(newCustomerInfo);
      // setCustomer(newCustomerInfo);
      // setLoggedInCustomer(newCustomerInfo);
      // history.replace(from);
    })
    .catch((error) => {
      const newCustomerInfo = { };
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
      displayName: name,
    })
    .then(() => {
      console.log("user name updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
