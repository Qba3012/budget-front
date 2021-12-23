import Type from "./Type";
import Category from "./Category";
import BudgetItem from "./BudgetItem";
import {
  BudgetInterface,
  CategorySortedBudget,
  TypeSortedBudget,
} from "./BudgetInterface";
import { AccountItem } from "./AccountItem";
import { BudgetApiDto } from "./api/BudgetApiDto";

class Budget implements BudgetInterface {
  month: number;
  year: number;
  slug: string;
  dateLabel: string;
  totalIncomesValue: number;
  totalExpensesValue: number;
  totalAccountsValue: number;
  accounts: AccountItem[];
  incomes: BudgetItem[];
  expenses: TypeSortedBudget[];

  private constructor(
    month: number,
    year: number,
    dateLabel: string,
    slug: string,
    totalIncomesValue: number,
    totalExpensesValue: number,
    totalAccountsValue: number,
    accounts: AccountItem[],
    incomes: BudgetItem[],
    expenses: TypeSortedBudget[]
  ) {
    this.month = month;
    this.year = year;
    this.dateLabel = dateLabel;
    this.slug = slug;
    this.totalIncomesValue = totalIncomesValue;
    this.totalExpensesValue = totalExpensesValue;
    this.totalAccountsValue = totalAccountsValue;
    this.incomes = incomes;
    this.accounts = accounts;
    this.expenses = expenses;
  }

  public static fromBudgetItems(date: Date, unsortedBudgetItems: BudgetItem[]) {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateLabel = date.toLocaleDateString("en-EN", {
      month: "long",
      year: "numeric",
    });
    const slug = date
      .toLocaleDateString("en-EN", { month: "short", year: "numeric" })
      .toLowerCase()
      .replaceAll(" ", "-");
    const incomes = this.getAllIncomes(unsortedBudgetItems);
    const expenses = this.getSortedExpenses(unsortedBudgetItems);
    const totalIncomesValue = this.sumIncomes(unsortedBudgetItems);
    const totalExpensesValue = this.sumExpenses(unsortedBudgetItems);
    const accounts = [] as AccountItem[];
    const totalAccountsValue = 0;
    return new Budget(
      month,
      year,
      dateLabel,
      slug,
      totalIncomesValue,
      totalExpensesValue,
      totalAccountsValue,
      accounts,
      incomes,
      expenses
    );
  }

  public static fromApiResponse(response: BudgetApiDto): Budget {
    const month = response.month;
    const year = response.year;
    const date = new Date();
    date.setFullYear(year, month - 1);
    const dateLabel = date.toLocaleDateString("en-EN", {
      month: "long",
      year: "numeric",
    });
    const slug = response.slug;
    const incomes = response.incomes.map(
      (income) => new BudgetItem(income.date, income.title, income.amount)
    );
    const expenses = response.expenses.map(
      (expense) =>
        new BudgetItem(
          expense.date,
          expense.title,
          expense.amount,
          expense.expenseType,
          expense.expenseCategory
        )
    );
    const accounts = response.accounts.map(
      (account) => new AccountItem(account.title, account.amount)
    );
    const totalIncomesValue =
      incomes.length > 0
        ? incomes
            .map((income) => income.amount)
            .reduce((sum, current) => sum + current)
        : 0;
    const totalExpensesValue =
      expenses.length > 0
        ? expenses
            .map((expense) => expense.amount)
            .reduce((sum, current) => sum + current)
        : 0;
    const totalAccountsValue =
      accounts.length > 0
        ? accounts
            .map((account) => account.amount)
            .reduce((sum, current) => sum + current)
        : 0;
    return new Budget(
      month,
      year,
      dateLabel,
      slug,
      totalIncomesValue,
      totalExpensesValue,
      totalAccountsValue,
      accounts,
      incomes,
      this.getSortedExpenses(expenses)
    );
  }

  private static getSortedExpenses = (unsortedBudgetItems: BudgetItem[]) => {
    const allExpenses = Budget.getAllExpenses(unsortedBudgetItems);
    const types = Budget.getALlTypes(unsortedBudgetItems);
    const categories = Budget.getAllCategories(unsortedBudgetItems);

    const items = [] as TypeSortedBudget[];
    types.forEach((type) => {
      const categoriesSortedList = [] as CategorySortedBudget[];
      categories.forEach((category) => {
        const categoryList = allExpenses.filter(
          (item) => item.category == category && item.type == type
        );
        if (categoryList.length > 0) {
          categoriesSortedList.push({
            category: category,
            sum: categoryList
              .map((item) => item.amount)
              .reduce((sum, current) => sum + current),
            sublist: categoryList,
          });
        }
      });
      if (categoriesSortedList.length > 0) {
        items.push({
          type: type,
          sum: categoriesSortedList
            .map((item) => item.sum)
            .reduce((sum, current) => sum + current),
          list: categoriesSortedList,
        });
      }
    });
    return items;
  };

  private static sumIncomes = (incomes: BudgetItem[]) => {
    const sortedIncomes = incomes
      .filter((item) => item.amount > 0)
      .map((income) => income.amount);
    if (sortedIncomes.length == 0) {
      return 0;
    }
    return sortedIncomes.reduce((sum, current) => sum + current);
  };

  private static getAllIncomes = (unsortedBudgetItems: BudgetItem[]) =>
    unsortedBudgetItems.filter((item) => item.amount > 0);

  private static getAllExpenses = (unsortedBudgetItems: BudgetItem[]) =>
    unsortedBudgetItems.filter((item) => item.amount < 0);

  private static getALlTypes = (unsortedBudgetItems: BudgetItem[]) =>
    unsortedBudgetItems
      .filter((item) => item.amount < 0)
      .map((item) => item.type)
      .filter((value, index, self) => self.indexOf(value) === index) as Type[];

  private static getAllCategories = (unsortedBudgetItems: BudgetItem[]) =>
    unsortedBudgetItems
      .filter((item) => item.amount < 0)
      .map((item) => item.category)
      .filter(
        (value, index, self) => self.indexOf(value) === index
      ) as Category[];

  private static sumExpenses(expenses: BudgetItem[]) {
    const sortedExpenses = expenses
      .filter((item) => item.amount < 0)
      .map((income) => income.amount);
    if (sortedExpenses.length == 0) {
      return 0;
    }
    return sortedExpenses.reduce((sum, current) => sum + current);
  }
}

export default Budget;
