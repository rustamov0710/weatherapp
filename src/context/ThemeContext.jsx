import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(localStorage.getItem('isDarkTheme') ? JSON.parse(localStorage.getItem('isDarkTheme')) : true)

    useEffect(() => {
        localStorage.setItem('isDarkTheme', JSON.stringify(isDark))
    },[isDark])

    return <ThemeContext.Provider value={{isDark, setIsDark}}>
        {children}
    </ThemeContext.Provider>
}
