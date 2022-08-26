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
const ThemeProvider = ({ children }) => {
  const [light, setLight] = useState(true);
  const toggleTheme = () => setLight(!light);
  const theme = light ?  themes.light : themes.dark ;
  const defaultValue = {
    toggleTheme,
    theme
  };
  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;