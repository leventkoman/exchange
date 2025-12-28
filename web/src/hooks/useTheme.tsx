import {useContext} from "react";
import type {ThemeContextType} from "../models/theme-context-type.ts";
import {ThemeContext} from "../context/ThemeContext.tsx";



export function useTheme(): ThemeContextType{
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a theme");
    }
    
    return context;
}