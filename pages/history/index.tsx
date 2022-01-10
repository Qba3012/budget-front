import React from "react";
import Months from "../../components/History/Months";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import MainLayout from "../../layouts/MainLayout";
import { HistoryApiResponse } from "../../model/api/HistoryApiResponse";
import Repository from "../../repository/Repository";

export const HISTORY_PATH = "/history";

const History: NextPage = ({ history }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <MainLayout>
      <Months history={JSON.parse(history) as HistoryApiResponse[]} />
    </MainLayout>
  );
};

export default History;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const history = await Repository.budget.getHistory();
    return {
      props: { history: JSON.stringify(history) },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};
