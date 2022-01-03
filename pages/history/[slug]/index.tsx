import MonthSummary from "../../../components/Summary/MonthSummary";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import MainLayout from "../../../layouts/MainLayout";
import axios from "axios";
import Budget from "../../../model/Budget";
import { BudgetInterface } from "../../../model/BudgetInterface";
import { HistoryApiResponse } from "../../../model/api/HistoryApiResponse";

const MonthDashboard: NextPage = ({
  budget,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <MainLayout>
      <MonthSummary budget={JSON.parse(budget) as BudgetInterface} />
    </MainLayout>
  );
};

export default MonthDashboard;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await axios.get(
    `${
      (process.env.API_BUDGET && process.env.API_BUDGET) ||
      "http://localhost:8080/budgets"
    }/${params?.slug}`
  );

  if (response.status == 200 && response.data) {
    return {
      props: { budget: JSON.stringify(Budget.fromApiResponse(response.data)) },
    };
  }
  return { props: { budget: null } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get(
    (process.env.API_HISTORY && process.env.API_HISTORY) ||
      "http://localhost:8080/budgets/history"
  );

  let paths = [] as { params: { slug: string } }[];

  if (response.status == 200 && response.data) {
    paths = (response.data as HistoryApiResponse[])
      .flatMap((year) => year.months)
      .map((month) => {
        return {
          params: {
            slug: month.slug,
          },
        };
      });
  }
  return {
    paths: paths,
    fallback: "blocking",
  };
};
