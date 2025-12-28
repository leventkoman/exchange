import {createContext, useEffect, useState} from "react";
import type {Theme, ThemeContextType} from "../models/theme-context-type.ts";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('dark');
    useEffect(() => {
        document.documentElement.classList.add("light");
    }, []);
    
    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        }
        
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}