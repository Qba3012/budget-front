import Head from "next/head";
import { FC } from "react";
import Header from "../components/Header/Header";
import { Box } from "@mui/material";
import MyDrawer from "../components/Drawer/MyDrawer";

const MainLayout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Budget</title>
        <meta name="description" content="Home budget monitor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MyDrawer />
        <Box
          component="section"
          sx={{
            margin: "auto",
            marginLeft: "18rem",
            marginRight: "2rem",
            marginBottom: 10,
          }}
        >
          <Header />
          {children}
        </Box>
      </main>
    </>
  );
};

export default MainLayout;
