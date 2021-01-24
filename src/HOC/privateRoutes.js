import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const status = window.localStorage.getItem("status");
        if (status) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/signin"} />;
        }
      }}
    />
  );
};
export default PrivateRoute;
