import React, { useEffect } from "react";
import authClient from "../integrations/rest/auth";

const AuthContext = React.createContext();
const initialState = {};
export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("authInfo")) || initialValue;

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      const { user, token } = action.payload;
      return { ...state, user, token };
    }
    case "LOGOUT": {
      return { ...state, user: null, token: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    authReducer,
    {
      user: null,
      token: null,
    },
    initializer
  );
  useEffect(() => {
    localStorage.setItem("authInfo", JSON.stringify(state));
  }, [state]);
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

async function login(dispatch, data) {
  try {
    const { user, token } = await authClient.login(data);
    dispatch({ type: "LOGIN", payload: { user, token } });
  } catch (error) {
    throw new Error(`Error trying to login. ${error.message}`);
  }
}

function logout(dispatch) {
  dispatch({ type: "LOGOUT", payload: {} });
}

export { AuthProvider, useAuth, login, logout };
