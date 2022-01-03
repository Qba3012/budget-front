import { useEffect } from "react";
import NewMonthStepper from "../../../components/NewMonth/NewMonthStepper/NewMonthStepper";
import { useRouter } from "next/router";
import { NEW_MONTH_IMPORT_PATH } from "../import";
import MonthHeaderSummary from "../../../components/Summary/MonthHeaderSummary";
import MonthExpensesSummary from "../../../components/Summary/MonthExpensesSummary";
import MonthIncomesSummary from "../../../components/Summary/MonthIncomesSummary";
import { useSnackbar } from "notistack";
import NewMonthAccountInput from "../../../components/NewMonth/NewMonthAccountInput/NewMonthAccountInput";
import type { NextPage } from "next";
import MainLayout from "../../../layouts/MainLayout";
import axios from "axios";
import { BudgetApiDto } from "../../../model/api/BudgetApiDto";
import { getBudget, setBudget } from "../../../store/summary-slice";
import { getCsvData } from "../../../store/csv-import-slice";
import Budget from "../../../model/Budget";
import { getAllBudgetItems } from "../../../store/import-review-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export const NEW_MONTH_SUMMARY_PATH = "/new-month/summary";

const NewMonthSummary: NextPage = () => {
  const budgetItems = useAppSelector(getAllBudgetItems);
  const budget = useAppSelector(getBudget);
  const csvData = useAppSelector(getCsvData);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const validateBudget = () => {
    const isError = !budget.accounts || budget.accounts.length == 0;
    const invalidAccount = budget.accounts.find((account) => account.title == "" || account.amount == 0);
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
      const budgetDto = BudgetApiDto.fromBudget(budget);
      axios
        .post(
          (process.env.NEXT_PUBLIC_BUDGET_API && process.env.NEXT_PUBLIC_BUDGET_API) || "http://localhost:8080/budgets",
          budgetDto
        )
        .then((response) => {
          if (response.status == 200) {
            router.push("/?refresh=yes");
          } else {
            enqueueSnackbar(response.data?.message, {
              variant: "error",
              anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("Server error, try again later", {
            variant: "error",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
          });
        });
    }
  };

  useEffect(() => {
    if (!csvData) router.push(NEW_MONTH_IMPORT_PATH);
    const budget = Budget.fromBudgetItems(new Date(), budgetItems);
    dispatch(setBudget({ ...budget }));
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
      <MonthIncomesSummary incomes={budget.incomes} totalIncomesValue={budget.totalIncomesValue} />
      <NewMonthAccountInput />
    </MainLayout>
  );
};

export default NewMonthSummary;
