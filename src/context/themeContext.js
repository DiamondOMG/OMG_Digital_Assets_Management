"use client";
import { createContext, useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);

	const toggleTheme = () => {
		setDarkMode((prevMode) => !prevMode);
	};

	const theme = createTheme({
		palette: {
			mode: darkMode ? "dark" : "light",
		},
	});

	return (
		<ThemeContext.Provider value={{ darkMode, toggleTheme }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};
