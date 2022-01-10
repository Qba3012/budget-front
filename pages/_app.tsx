import store from "../store";
import { SessionProvider, useSession } from "next-auth/react";
import { Provider } from "react-redux";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { RED_GRADIENT } from "../utils/Constants";
import { Component, FC, useEffect } from "react";
import { useRouter } from "next/router";

declare module "react" {
  interface ComponentClass {
    auth?: boolean;
  }

  interface FunctionComponent {
    auth?: boolean;
  }
}

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
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </SnackbarProvider>
        </Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}

const Auth: FC = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status == "authenticated";

  useEffect(() => {
    if (!isAuthenticated || !session) {
      router.push(`/`);
    }
  }, [session, router, isAuthenticated]);

  return <>{isAuthenticated && children}</>;
};

export default MyApp;
