import React, { createContext, useState, useContext, useEffect } from "react";
import { getSoundPreference } from "./util/localstorage";

export type AudioLanguage = "Amharic" | "English" | "Affan Oromo";

interface AudioLanguageContextType {
  audioLanguage: AudioLanguage;
  updateAudioLanguage: (language: AudioLanguage) => void;
}

const AudioLanguageContext = createContext<
  AudioLanguageContextType | undefined
>(undefined);

function AudioLanguageProvider({ children }: { children: any }) {
  const [audioLanguage, setAudioLanguage] = useState<AudioLanguage>(
    getSoundPreference() ?? "English"
  );

  useEffect(() => {
    setAudioLanguage(getSoundPreference() ?? "English");
  }, []);

  const updateAudioLanguage = (language: AudioLanguage) => {
    setAudioLanguage(language);
  };

  const contextValue: AudioLanguageContextType = {
    audioLanguage,
    updateAudioLanguage,
  };

  return (
    <AudioLanguageContext.Provider value={contextValue}>
      {children}
    </AudioLanguageContext.Provider>
  );
}

const useAudioLanguage = (): AudioLanguageContextType => {
  const context = useContext(AudioLanguageContext);

  if (!context) {
    throw new Error(
      "useAudioLanguage must be used within an AudioLanguageProvider"
    );
  }
  return context;
};

export { AudioLanguageProvider, useAudioLanguage };
