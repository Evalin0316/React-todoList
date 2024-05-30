import React, { useState, useMemo, useCallback } from "react";
import { ThemeContext, LoginStatus, themes} from './theme';

const Provider = ({ children }) => {
    const [light, setLight] = useState(true);
    const [login, setLogin] = useState(false);
    const toggleTheme = useCallback(() =>{setLight(!light)}, [light]);
    const onLogin =  useCallback(() => {setLogin(!login)}, [login]);

    const theme = light ?  themes.light : themes.dark ;
   
    
    const defaultValue = useMemo(
      ()=>({
      toggleTheme,
      theme,
    }),[toggleTheme, theme]);

    const userStatus = useMemo(
      ()=>({
      onLogin,
      login
    }),[onLogin,login])

    return (
      <ThemeContext.Provider value={defaultValue}>
      <LoginStatus.Provider value={userStatus}>
        {children}
      </LoginStatus.Provider>
      </ThemeContext.Provider>
    );
  };

  export default Provider;