import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WebRoutes from "./routes";
import { AuthProvider } from "./context/auth";
import GraphQLProvider from "./integrations/graphql/provider";

const App = () => (
  <AuthProvider>
    <GraphQLProvider>
      <BrowserRouter>
        <Switch>
          {WebRoutes.getList().map((item) => (
            <Route
              key={`${item.path}`}
              exact={item.exact !== undefined ? item.exact : true}
              path={item.path}
              component={item.component}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </GraphQLProvider>
  </AuthProvider>
);

export default App;
