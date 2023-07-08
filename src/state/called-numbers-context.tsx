import React, { createContext, useState, useContext, useEffect } from "react";

interface CalledNumbersContextType {
  calledNumbers: (number | undefined)[];
  updateCalledNumbers: (calledNumbers: (number | undefined)[]) => void;
}

const CalledNumbersContext = createContext<
  CalledNumbersContextType | undefined
>(undefined);

function CalledNumbersContextProvider({ children }: { children: any }) {
  const [calledNumbers, setCalledNumbers] = useState<(number | undefined)[]>(
    []
  );

  const updateCalledNumbers = (calledNumbers: (number | undefined)[]) => {
    setCalledNumbers(calledNumbers);
  };

  const contextValue: CalledNumbersContextType = {
    calledNumbers,
    updateCalledNumbers,
  };

  return (
    <CalledNumbersContext.Provider value={contextValue}>
      {children}
    </CalledNumbersContext.Provider>
  );
}

const useCalledNumbers = (): CalledNumbersContextType => {
  const context = useContext(CalledNumbersContext);

  if (!context) {
    throw new Error(
      "useCalledNumbers must be used within a CalledNumbersContextProvider"
    );
  }

  return context;
};

export { CalledNumbersContextProvider, useCalledNumbers };
