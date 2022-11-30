import React from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Amplify } from "aws-amplify";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import awsExports from "../aws-exports";
import theme from "../styles/mui";

Amplify.configure({ ...awsExports });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
      <Toaster position="bottom-center" />
    </ThemeProvider>
  );
};

export default App;
