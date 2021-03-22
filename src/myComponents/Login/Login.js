import React, { useContext, useState } from "react";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
// import firebaseConfig from "../../firebase.config";
import Header from "../Header/Header";
import { Link, useHistory, useLocation } from "react-router-dom";
import { CustomerContext } from "../../App";
import { initializeLoginFramework, handleGoogleLogin, handleLogOut, logInWithEmailAndPassword, resetPassword } from './LoginManager';

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }

const Login = () => {

  const [loggedInCustomer, setLoggedInCustomer] = useContext(CustomerContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [newCustomer, setNewCustomer] = useState( false );

  const [customer, setCustomer] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    success: true,
  });

    
  initializeLoginFramework();

  const googleLogin = () => {
    handleGoogleLogin()
    .then(res => {
      handleResponse(res, true)
    })
  }

  const handleResponse = (res, redirect) =>{
    setCustomer(res);
    setLoggedInCustomer(res);
    if(redirect){
        history.replace(from);
    }
};

const logOut = () => {
    handleLogOut()
    .then(res => {
      handleResponse(res, false);
    })
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
    if (newCustomer && customer.email && customer.password) {
        logInWithEmailAndPassword(customer.email, customer.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    event.preventDefault();
  };

  return (
    <div className="login">
      <Header></Header>
      <div className="container col-sm-5 form">
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

        <div className="d-flex justify-content-center">
            <div style={{borderTop: '1px solid gray', width:'48%'}}></div>
            <p style={{marginTop:'-13px'}}>or</p>
            <div style={{borderTop:'1px solid gray', width:'48%'}}></div>
        </div>

        <div>
          <button
            onClick={googleLogin}
            className="btn btn-outline-success"
          >
            Go with Google
          </button>
        </div>
        <p style={{color: 'red', textAlign:'center'}}>{customer.error}</p>
      </div>
    </div>
  );
};

export default Login;
