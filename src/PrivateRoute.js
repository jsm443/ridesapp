import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ path, children }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      path={path}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Navigate to="/signin" state={{ from: location }} replace />
        )
      }
    />
  );
};

export default PrivateRoute;