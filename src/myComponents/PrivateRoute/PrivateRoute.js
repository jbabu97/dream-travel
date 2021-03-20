import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { CustomerContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInCustomer, setLoggedInCustomer] = useContext(CustomerContext)
    return (
        <Route
      {...rest}
      render={({ location }) =>
        loggedInCustomer.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;