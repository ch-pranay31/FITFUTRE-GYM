import { createContext, useContext, useState } from "react";

const IntroContext = createContext();

export function IntroProvider({ children }) {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <IntroContext.Provider
      value={{
        introFinished,
        setIntroFinished,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}