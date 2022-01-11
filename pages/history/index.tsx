import React from "react";
import Months from "../../components/History/Months";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import MainLayout from "../../layouts/MainLayout";
import axios from "axios";
import { HistoryApiResponse } from "../../model/api/HistoryApiResponse";
import { AuthService } from "../../auth/AuthService";

export const HISTORY_PATH = "/history";

const History: NextPage = ({ history }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <MainLayout>
      <Months history={JSON.parse(history) as HistoryApiResponse[]} />
    </MainLayout>
  );
};

History.auth = true;

export default History;

export const getStaticProps: GetStaticProps = async () => {
  const token = await AuthService.getToken();
  const response = await axios.get(
    (process.env.API_HISTORY && process.env.API_HISTORY) || "http://localhost:8080/budgets/history", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );

  if (response.status == 200 && response.data) {
    return {
      props: { history: JSON.stringify(response.data as HistoryApiResponse[]) },
      revalidate: 60
    };
  }
  return { notFound: true };
};
