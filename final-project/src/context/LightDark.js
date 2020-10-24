import React, { useState, createContext } from "react";

export const LightDarkContext = createContext();

export const LightDarkProvider = props => {
  const [theme, setTheme] = useState("dark");

  return (
    <LightDarkContext.Provider value={[theme, setTheme]}>
      {props.children}
    </LightDarkContext.Provider>
  );
};
