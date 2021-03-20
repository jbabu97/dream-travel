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

export const CustomerContext = createContext();

function App() {
  const [loggedInCustomer, setLoggedInCustomer] = useState({});
  return (
    <div className="container">
      <CustomerContext.Provider value={[loggedInCustomer, setLoggedInCustomer]}>
        <Router>
            {/* <Header></Header> */}
            <h3>{loggedInCustomer.email}</h3>
          <Switch>
            <Route path="/home">
              <Home/>
            </Route>
            <PrivateRoute path="/destination">
              <Destination />
            </PrivateRoute>
            <Route path="/login">
              <Login/>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
    </CustomerContext.Provider>
    </div>
  );
}

export default App;
