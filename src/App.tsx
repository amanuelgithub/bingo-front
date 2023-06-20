import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import AuthContextProvider from "./state/contexts/auth-context";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
