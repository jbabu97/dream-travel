import React, { useContext, useState } from "react";
import "./Login.css";
import "firebase/auth";
import Header from "../Header/Header";
import { Link, useHistory, useLocation } from "react-router-dom";
import { CustomerContext } from "../../App";
import { initializeLoginFramework, handleGoogleLogin, logInWithEmailAndPassword} from './LoginManager';
import GoogleIcon from '../../images/google.png';

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


  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length >= 6;
      const isPasswordHasNum = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNum;
    }
    if (isFieldValid) {
      const newCustomerInfo = { ...customer };
      newCustomerInfo[e.target.name] = e.target.value;
      setCustomer(newCustomerInfo);
    }
  };

  const handleSubmit = (e) => {
    if (customer.email && customer.password) {
        logInWithEmailAndPassword(customer.email, customer.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    e.preventDefault();
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
            className="btn btn-outline-success custom_btn"
          > <img src={GoogleIcon} alt=""/> 
            Go with Google
          </button>
        </div>
        <p style={{color: 'red', textAlign:'center'}}>{customer.error}</p>
      </div>
    </div>
  );
};

export default Login;
