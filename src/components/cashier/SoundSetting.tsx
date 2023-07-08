import React, { useEffect } from "react";
import { AiFillSound } from "react-icons/ai";
import { AudioLanguage, useAudioLanguage } from "../../audio-lang-context";
import { storeSoundPreference } from "../../util/localstorage";

function SoundSetting() {
  //   const { audioLanguage, updateAudioLanguage } = useAudioLanguage();
  const { audioLanguage, updateAudioLanguage } = useAudioLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLanguage = e.target.value as AudioLanguage;
    updateAudioLanguage(selectedLanguage);

    storeSoundPreference(selectedLanguage);
  };

  //   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     // const selectedLanguage = e.target.value as AudioLanguage;
  //     updateAudioLanguage(selectedLanguage);
  //   };

  useEffect(() => {
    console.log("audio-lang: ", audioLanguage);
    // handl;
  }, [audioLanguage]);

  return (
    <div className="flex h-full flex-col items-center justify-start py-10 sm:py-20">
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-8 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-center sm:gap-8 md:min-w-[550px] md:p-16 md:text-xl">
        <div className="flex h-full flex-row items-center justify-center gap-2 border-r border-gray-500">
          <h1>Sound Language Settings</h1>
          <AiFillSound className="text-4xl" />
        </div>

        {audioLanguage && (
          <div className="flex flex-col">
            <label className="my-1 gap-4  whitespace-nowrap border border-yellow-500 bg-yellow-100 px-3 py-1">
              <input
                type="radio"
                value="Amharic"
                checked={audioLanguage === "Amharic"}
                onChange={handleLanguageChange}
                className="accent-yellow-500"
              />
              Amharic
            </label>

            <label className="my-1 gap-4  whitespace-nowrap border border-green-500 bg-green-100 px-3 py-1">
              <input
                type="radio"
                value="English"
                checked={audioLanguage === "English"}
                onChange={handleLanguageChange}
                className="accent-green-500"
              />
              English
            </label>

            <label className="my-1 gap-4 whitespace-nowrap border border-purple-500 bg-purple-100 px-3 py-1">
              <input
                type="radio"
                value="Affan Oromo"
                checked={audioLanguage === "Affan Oromo"}
                onChange={handleLanguageChange}
                className="accent-purple-500"
              />
              Affan Oromo
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default SoundSetting;
