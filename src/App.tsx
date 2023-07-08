import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import AuthContextProvider from "./state/contexts/auth-context";
import GameContextProvider from "./state/contexts/game-context";
import { AudioLanguageProvider } from "./state/audio-lang-context";
import { CalledNumbersContextProvider } from "./state/called-numbers-context";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GameContextProvider>
          <AudioLanguageProvider>
            <CalledNumbersContextProvider>
              <Router />
            </CalledNumbersContextProvider>
          </AudioLanguageProvider>
        </GameContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
