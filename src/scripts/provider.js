import React, { useState } from "react";
import { ThemeContext, LoignStatus,themes} from './theme';

const Provider = ({ children }) => {
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

  export default Provider;