import React from "react";

export const themes = {
    light: {
      background: "linear-gradient(175deg, #FFD370 60%, #FFFFFF 40%)"
    },
    dark: {
      background: "linear-gradient(175deg, #B0C4DE 60%,  #483D8B 40%)"
    }
  };

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {}
});

export const LoginStatus = React.createContext({
  login:false,
  onLogin:() =>{}
});