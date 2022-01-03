import React from "react";
import Months from "../../components/History/Months";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";
import { HistoryApiResponse } from "../../model/api/HistoryApiResponse";

export const HISTORY_PATH = "/history";

const History: NextPage = ({
  history,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <MainLayout>
      <Months history={JSON.parse(history) as HistoryApiResponse[]} />
    </MainLayout>
  );
};

export default History;

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(
    (process.env.API_HISTORY && process.env.API_HISTORY) ||
      "http://localhost:8080/budgets/history"
  );

  if (response.status == 200 && response.data) {
    return {
      props: { history: JSON.stringify(response.data as HistoryApiResponse[]) },
      revalidate: 60,
    };
  }
  return { notFound: true };
};
