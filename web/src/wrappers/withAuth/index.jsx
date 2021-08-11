import React from "react";
import AuthGateway from "../../containers/AuthGateway";

const withAuth = (Component) => () => (
  <AuthGateway>
    <Component />
  </AuthGateway>
);

export default withAuth;
