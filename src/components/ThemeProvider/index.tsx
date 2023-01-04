'use client';

import '@/styles/app.scss';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'dark'
	}
});

export type ThemeProviderProps = {
	children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
