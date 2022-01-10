import { Button, Typography, useTheme } from "@mui/material";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import React, { useEffect } from "react";
import { NEW_MONTH_IMPORT_PATH } from "./new-month/import";
import MonthSummary from "../components/Summary/MonthSummary";
import MainLayout from "../layouts/MainLayout";
import { useRouter } from "next/router";
import Repository from "../repository/Repository";

export const HOME_PATH = "/";

const Home: NextPage = ({ budget }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (router.query.refresh) {
      router.replace(router.basePath);
    }
  }, []);

  const placeholder = (
    <>
      <Typography variant="h4" sx={{ color: theme.palette.grey["400"] }}>
        You don&apos;t have any data saved yet
      </Typography>
      <Typography variant="h5" sx={{ mt: 2, color: theme.palette.grey["400"] }}>
        Please add your first monthly budget!
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} href={NEW_MONTH_IMPORT_PATH}>
        New month
      </Button>
    </>
  );

  const component = budget ? <MonthSummary budget={JSON.parse(budget)} /> : placeholder;

  return <MainLayout>{component}</MainLayout>;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const budget = await Repository.budget.getLatest();
    return {
      props: { budget: JSON.stringify(budget) },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return { props: { budget: null } };
  }
};
