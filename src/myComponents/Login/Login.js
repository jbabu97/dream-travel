import React, { useContext, useState } from "react";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import Header from "../Header/Header";
import { Link, useHistory, useLocation } from "react-router-dom";
import { CustomerContext } from "../../App";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [customer, setCustomer] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    success: true,
  });

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const [loggedInCustomer, setLoggedInCustomer] = useContext(CustomerContext);

  const [newCustomer, setNewCustomer] = useState( false );

  const handleFacebookLogin = () => {
    console.log("facebook clicked");
    const facebookProvider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((res) => {
        const { displayName, email } = res.user;
        const isLoggedIn = {
            isLoggedIn: true,
            name: displayName,
            email: email
          }
        setCustomer(isLoggedIn);
        history.replace(from);
        console.log(isLoggedIn);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setCustomer(errorMessage);
        console.log(errorMessage);
      });
  };

  const handleBlur = (event) => {
    console.log(event.target.name, event.target.value);
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isFieldValid);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length >= 6;
      const isPasswordHasNum = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNum;
      console.log(isFieldValid);
    }
    if (isFieldValid) {
      const newCustomerInfo = { ...customer };
      newCustomerInfo[event.target.name] = event.target.value;
      setCustomer(newCustomerInfo);
      console.log(newCustomerInfo);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newCustomer && customer.email && customer.password) {
      // user create
      firebase
        .auth()
        .createUserWithEmailAndPassword(customer.email, customer.password)
        .then((res) => {
          console.log(res);
          const newCustomerInfo = { ...customer };
          newCustomerInfo.error = "";
          newCustomerInfo.success = true;
          setCustomer(newCustomerInfo);
          updateCustomerName(customer.name);
        })
        .catch((error) => {
          const newCustomerInfo = { ...customer };
          newCustomerInfo.error = error.message;
          newCustomerInfo.success = false;
          setCustomer(newCustomerInfo);
        });
      console.log("sign in");
    }
    // customer login
    if (!newCustomer && customer.email && customer.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(customer.email, customer.password)
        .then((res) => {
          console.log(res);
          const newCustomerInfo = { ...customer };
          newCustomerInfo.error = "";
          newCustomerInfo.success = true;
          setCustomer(newCustomerInfo);
          setLoggedInCustomer(newCustomerInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newCustomerInfo = { ...customer };
          newCustomerInfo.error = error.message;
          newCustomerInfo.success = false;
          setCustomer(newCustomerInfo);
        });
      console.log("sign up");
    }
  };

  const updateCustomerName = name => {
    const customer = firebase.auth().currentUser;

    customer.updateProfile({
      displayName: name
    }).then(function() {
          console.log('Update successful.');
          const newCustomerInfo = { ...customer };
          newCustomerInfo.error = "";
          newCustomerInfo.success = true;
          setCustomer(newCustomerInfo);
    }).catch(function(error) {
          console.log(error);
          const newCustomerInfo = { ...customer };
          newCustomerInfo.error = error.message;
          newCustomerInfo.success = false;
          setCustomer(newCustomerInfo);
    });

  };

  return (
    <div className="login">
      <Header></Header>
      <h4>{customer.name}</h4>
      {/* <h4>{loggedInCustomer.name}</h4> */}
      <div className=" col-sm-5 form">
        {
            newCustomer ? <h2> Create an account</h2> : <h2>Login</h2>
        }
        <form onSubmit={handleSubmit}>
          {
              newCustomer && 
              <p>
              <input
                onBlur={handleBlur}
                type="text"
                name="name"
                placeholder="Name"
                required
              />
            </p>
          }
          <p>
            <input
              onBlur={handleBlur}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </p>
          <p>
            <input
              onBlur={handleBlur}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </p>
          {
              newCustomer && 
              <p>
            <input
              onBlur={handleBlur}
              type="password"
              name="password"
              placeholder="Confirm Password"
              required
            />
          </p>
          }
          <input
            className="btn btn-success"
            type="submit"
            value={newCustomer ? "Create an account" : "Login"}
          />
          {
              newCustomer ? 
              <p>
            <small>
              Already have an account? <Link onClick={() => setNewCustomer(!newCustomer)} className="text-success" href="">
                 Login
              </Link>
            </small>
          </p> :
              <p>
            <small>
              Don't have an account? <Link onClick={() => setNewCustomer(!newCustomer)} className="text-success" href="">
                 Create an account
              </Link>
            </small>
          </p>
          }
        </form>
        <div>
          <button
            onClick={handleFacebookLogin}
            className="btn btn-outline-success"
          >
            Go with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
