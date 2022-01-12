import MonthSummary from "../../../components/Summary/MonthSummary";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import MainLayout from "../../../layouts/MainLayout";
import axios from "axios";
import Budget from "../../../model/Budget";
import { BudgetInterface } from "../../../model/BudgetInterface";
import { HistoryApiResponse } from "../../../model/api/HistoryApiResponse";
import Repository from "../../../repository/Repository";

const MonthDashboard: NextPage = ({ budget }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <MainLayout>
      <MonthSummary budget={JSON.parse(budget) as BudgetInterface} />
    </MainLayout>
  );
};

export default MonthDashboard;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let param = "";
  if (params?.slug) {
    if (Array.isArray(params.slug) && params.slug.length > 0) {
      param = params.slug[0];
    } else if (!Array.isArray(params.slug)) {
      param = params.slug;
    }
  }

  try {
    const budget = await Repository.budget.getBySlug(param);
    return {
      props: { budget: JSON.stringify(budget) },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return { props: { budget: null } };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [] as { params: { slug: string } }[];

  try {
    const history = await Repository.budget.getHistory();
    paths = history
      .flatMap((year) => year.months)
      .map((month) => {
        return {
          params: {
            slug: month.slug,
          },
        };
      });
  } catch (error) {
    console.error(error);
  }
  return {
    paths: paths,
    fallback: "blocking",
  };
};
