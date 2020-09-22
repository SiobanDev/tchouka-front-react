import React from "react";

const initialContextValues = {
  loggedIn: [],
  setLoggedIn: () => {},
};

const LoginContext = React.createContext(initialContextValues);

export default LoginContext;
