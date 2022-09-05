import React, { useState } from "react";

const themes = {
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

export const LoignStatus = React.createContext({
  login:false,
  setlogin:() =>{}
});
const ThemeProvider = ({ children }) => {
  const [light, setLight] = useState(true);
  const [login, setLogin] = useState(false);
  const toggleTheme = () => setLight(!light);
  const setlogin = () =>  setLogin(!login);
  const theme = light ?  themes.light : themes.dark ;
 
  
  const defaultValue = {
    toggleTheme,
    theme,
  };
  const userStatus = {
    setlogin,
    login
  }
  return (
    <ThemeContext.Provider value={defaultValue}>
    <LoignStatus.Provider value={userStatus}>
      {children}
    </LoignStatus.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;