import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: AdminComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const hasAccess = rest.isAuthenticated;
        if (hasAccess) {
          return <AdminComponent {...props} />;
        }
        return <Redirect to='/signin' />;
      }}
    />
  );
};

export default AdminRoute;
