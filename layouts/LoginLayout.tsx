import { FC } from "react";
import Head from "next/head";
import { Box } from "@mui/material";

const LoginLayout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Budget</title>
        <meta name="description" content="Home budget monitor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          component="section"
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {children}
        </Box>
      </main>
    </>
  );
};

export default LoginLayout;
