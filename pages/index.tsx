import { Button, Typography, useTheme } from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import { getAllBudgets } from "../store/history-slice";
import { useAppSelector } from "../store/hooks";
import { NEW_MONTH_IMPORT_PATH } from "./new-month/import";
import MonthSummary from "../components/Summary/MonthSummary";
import MainLayout from "../layouts/MainLayout";

export const HOME_PATH = "/";

const Home: NextPage = () => {
  const history = useAppSelector(getAllBudgets);
  const theme = useTheme();

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

  const component =
    history.length > 0 ? <MonthSummary budget={history[0]} /> : placeholder;

  return <MainLayout>{component}</MainLayout>;
};

export default Home;
