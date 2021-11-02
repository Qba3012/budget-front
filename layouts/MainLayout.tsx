import Head from "next/head";
import { FC } from "react";
import Header from "../components/Header/Header";

const MainLayout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Budget</title>
        <meta name="description" content="Home budget monitor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <main>
              <Header />
              {children}
          </main>
    </>
  );
};

export default MainLayout;
