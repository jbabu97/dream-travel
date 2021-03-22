import './App.css';
import Home from './myComponents/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './myComponents/Login/Login';
import Header from './myComponents/Header/Header';
import Destination from './myComponents/Destination/Destination';
import { createContext, useState } from 'react';
import PrivateRoute from './myComponents/PrivateRoute/PrivateRoute';
import Contact from './myComponents/Contact/Contact';

export const CustomerContext = createContext();

function App() {
  const [loggedInCustomer, setLoggedInCustomer] = useState({});
  return (
    <div className="container">
      <CustomerContext.Provider value={[loggedInCustomer, setLoggedInCustomer]}>
        <Router>
            {/* <Header></Header> */}
            <h3>{loggedInCustomer.name}</h3>
          <Switch>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/contact">
              <Contact/>
            </Route>
            <PrivateRoute path="/destination">
              <Destination />
            </PrivateRoute>
            <PrivateRoute path="/destination/:serviceId">
              <Destination />
            </PrivateRoute>
            <Route path="/login">
              <Login/>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <h2 style={{textAlign: 'center', color: 'red'}}>Not Found</h2>
            </Route>
          </Switch>
        </Router>
    </CustomerContext.Provider>
    </div>
  );
}

export default App;
