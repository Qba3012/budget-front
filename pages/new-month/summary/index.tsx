import { useEffect } from "react";
import { useSelector } from "react-redux";
import NewMonthStepper from "../../../components/NewMonth/NewMonthStepper/NewMonthStepper";
import { getBudget, getCsvData } from "../../../store/new-month-slice";
import { useRouter } from "next/router";
import { NEW_MONTH_IMPORT_PATH } from "../import";
import MonthHeaderSummary from "../../../components/Summary/MonthHeaderSummary";
import MonthExpensesSummary from "../../../components/Summary/MonthExpensesSummary";
import MonthIncomesSummary from "../../../components/Summary/MonthIncomesSummary";
import { useSnackbar } from "notistack";
import NewMonthAccountInput from "../../../components/NewMonth/NewMonthAccountInput/NewMonthAccountInput";
import type { NextPage } from "next";
import MainLayout from "../../../layouts/MainLayout";

export const NEW_MONTH_SUMMARY_PATH = "/new-month/summary";

const NewMonthSummary: NextPage = () => {
  const budget = useSelector(getBudget);
  const csvData = useSelector(getCsvData);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const validateBudget = () => {
    const isError = !budget.accounts || budget.accounts.length == 0;
    const invalidAccount = budget.accounts.find(
      (account) => account.title == "" || account.amount == 0
    );
    if (isError) {
      enqueueSnackbar("Fill up accounts section to record your assets", {
        variant: "warning",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
      return isError;
    }
    if (invalidAccount) {
      enqueueSnackbar("All accounts must have valid title and amount", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
      return !!invalidAccount;
    }
    return false;
  };

  const handleSaveButtonClick = () => {
    const isError = validateBudget();
    if (!isError) {
      router.push("/");
    }
  };

  useEffect(() => {
    if (!csvData) router.push(NEW_MONTH_IMPORT_PATH);
  }, []);

  return (
    <MainLayout>
      <NewMonthStepper step={2} />
      <MonthHeaderSummary
        month={budget.dateLabel}
        allExpensesValue={budget.totalExpensesValue}
        allIncomesValue={budget.totalIncomesValue}
        handleSaveAction={handleSaveButtonClick}
      />
      <MonthExpensesSummary expenses={budget.expenses} />
      <MonthIncomesSummary
        incomes={budget.incomes}
        totalIncomesValue={budget.totalIncomesValue}
      />
      <NewMonthAccountInput />
    </MainLayout>
  );
};

export default NewMonthSummary;
