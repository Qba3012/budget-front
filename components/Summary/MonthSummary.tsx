import { FC } from "react";
import MonthHeaderSummary from "./MonthHeaderSummary";
import MonthExpensesSummary from "./MonthExpensesSummary";
import MonthIncomesSummary from "./MonthIncomesSummary";
import MonthAccountsSummary from "./MonthAccountsSummary";
import { BudgetInterface } from "../../model/BudgetInterface";

type Props = {
  budget: BudgetInterface;
};

const MonthSummary: FC<Props> = ({ budget }) => {
  return (
    <>
      <MonthHeaderSummary
        month={budget.dateLabel}
        allIncomesValue={budget.totalIncomesValue}
        allExpensesValue={budget.totalExpensesValue}
      />
      <MonthExpensesSummary expenses={budget.expenses} />
      <MonthIncomesSummary
        incomes={budget.incomes}
        totalIncomesValue={budget.totalIncomesValue}
      />
      <MonthAccountsSummary
        accounts={budget.accounts}
        totalAccountsValue={budget.totalAccountsValue}
      />
    </>
  );
};

export default MonthSummary;
