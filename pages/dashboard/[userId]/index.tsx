import { Button, Typography, useTheme } from "@mui/material";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { GetStaticPaths } from "next";
import React, { useEffect } from "react";
import { NEW_MONTH_IMPORT_PATH } from "../../new-month/import";
import MonthSummary from "../../../components/Summary/MonthSummary";
import MainLayout from "../../../layouts/MainLayout";
import axios from "axios";
import Budget from "../../../model/Budget";
import { useRouter } from "next/router";

export const DASHBOARD_PATH = "/dashboard/";

const Home: NextPage = ({ budget }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (router.query.refresh) {
      router.replace(router.basePath);
    }
  }, [router]);

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

Home.auth = true;

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(
    (process.env.API_LATEST && process.env.API_LATEST) || "http://localhost:8080/budgets/latest"
  );

  if (response.status == 200 && response.data) {
    return {
      props: { budget: JSON.stringify(Budget.fromApiResponse(response.data)) },
      revalidate: 60,
    };
  }
  return { props: { budget: null } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { userId: "Test" } }];
  return {
    paths: paths,
    fallback: "blocking",
  };
};
