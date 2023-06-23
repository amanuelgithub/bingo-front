import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import AuthContextProvider from "./state/contexts/auth-context";
import GameContextProvider from "./state/contexts/game-context";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GameContextProvider>
          <Router />
        </GameContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
