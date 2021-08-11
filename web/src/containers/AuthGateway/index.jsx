import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { useAuth } from "../../context/auth";

const AuthGateway = ({ location, children }) => {
  const {
    state: { user, token },
  } = useAuth();
  const isAuth = Boolean(user) && Boolean(token);
  const prevUrl = `${location.pathname}${location.search}`;
  return (
    <>
      {(isAuth && children) || (
        <Redirect to={{ pathname: "/login", state: { prevUrl } }} />
      )}
    </>
  );
};

export default withRouter(AuthGateway);
