import { useEffect } from "react";
import NewMonthStepper from "../../../components/NewMonth/NewMonthStepper/NewMonthStepper";
import NewMonthReview from "../../../components/NewMonth/NewMonthReview/NewMonthReview";
import { useSelector } from "react-redux";
import { getCsvData } from "../../../store/new-month-slice";
import { useRouter } from "next/router";
import { NEW_MONTH_IMPORT_PATH } from "../import";
import { NextPage } from "next";
import MainLayout from "../../../layouts/MainLayout";

export const NEW_MONTH_REVIEW_PATH = "/new-month/review";

const NewMonthBudgetItems: NextPage = () => {
  const data = useSelector(getCsvData);
  const router = useRouter();

  useEffect(() => {
    if (!data) router.push(NEW_MONTH_IMPORT_PATH);
  }, []);

  return (
    <MainLayout>
      <NewMonthStepper step={1} />
      <NewMonthReview />
    </MainLayout>
  );
};

export default NewMonthBudgetItems;
