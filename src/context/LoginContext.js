import React from "react";

const initialContextValues = {
  loggedIn: [],
  setLoggedIn: () => {},
  userId: null,
  setUserId: () => {},
};

const LoginContext = React.createContext(initialContextValues);

export default LoginContext;
