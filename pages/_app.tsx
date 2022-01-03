import store from "../store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { RED_GRADIENT } from "../utils/Constants";

declare module "@mui/material/styles" {
  interface Palette {
    gradient: Palette["primary"];
  }

  interface PaletteOptions {
    gradient: PaletteOptions["primary"];
  }
}
declare global {
  interface String {
    firstLetterToUpperCase(): string;
  }
}
let theme = createTheme({
  palette: {
    primary: {
      main: "#5B7CFD",
      light: "#D8E0FE",
      dark: "#5274f0",
    },
    secondary: {
      main: "#33CC86",
      light: "#CDF5F4",
    },
    warning: {
      main: "#FF7F57",
      light: "#FFE5DD",
    },
    common: {
      black: "rgb(0,0,0,0.7)",
    },
    error: {
      main: "rgb(233,64,87)",
    },
    gradient: { main: RED_GRADIENT },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

theme = responsiveFontSizes(theme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
