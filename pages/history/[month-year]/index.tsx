import BudgetItem from "../../../model/BudgetItem";
import Budget from "../../../model/Budget";
import { AccountItem } from "../../../model/AccountItem";
import MonthSummary from "../../../components/Summary/MonthSummary";
import { NextPage } from "next";
import MainLayout from "../../../layouts/MainLayout";

const MonthDashboard: NextPage = () => {
  const expense = new BudgetItem("20-11-2021", "Test", -150);
  const income = new BudgetItem("20-11-2021", "Test", 150);
  const budget = new Budget(new Date("10-11-2021"), [expense, income]);
  const account = new AccountItem("mBank", 1000);
  budget.totalAccountsValue = 1000;
  budget.accounts = [account];

  return (
    <MainLayout>
      <MonthSummary budget={budget} />
    </MainLayout>
  );
};

export default MonthDashboard;
