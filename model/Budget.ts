import Type from "./Type";
import Category from "./Category";
import BudgetItem from "./BudgetItem";
import {
  BudgetInterface,
  CategorySortedBudget,
  TypeSortedBudget,
} from "./BudgetInterface";
import { AccountItem } from "./AccountItem";

class Budget implements BudgetInterface {
  month: number;
  year: number;
  dateLabel: string;
  totalIncomesValue: number;
  totalExpensesValue: number;
  totalAccountsValue: number;
  accounts: AccountItem[];
  incomes: BudgetItem[];
  expenses: TypeSortedBudget[];

  constructor(date: Date, unsortedBudgetItems: BudgetItem[]) {
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.dateLabel = date.toLocaleDateString("en-EN", {
      month: "long",
      year: "numeric",
    });
    this.incomes = this.getAllIncomes(unsortedBudgetItems);
    this.expenses = this.getSortedExpenses(unsortedBudgetItems);
    this.totalIncomesValue = this.sumIncomes(unsortedBudgetItems);
    this.totalExpensesValue = this.sumExpenses(unsortedBudgetItems);
    this.accounts = [] as AccountItem[];
    this.totalAccountsValue = 0;
  }

  private getSortedExpenses = (unsortedBudgetItems: BudgetItem[]) => {
    const allExpenses = this.getAllExpenses(unsortedBudgetItems);
    const types = this.getALlTypes(unsortedBudgetItems);
    const categories = this.getAllCategories(unsortedBudgetItems);

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

  private sumIncomes = (incomes: BudgetItem[]) => {
    return incomes
      .filter((item) => item.amount > 0)
      .map((income) => income.amount)
      .reduce((sum, current) => sum + current);
  };

  private getAllIncomes = (unsortedBudgetItems: BudgetItem[]) =>
    unsortedBudgetItems.filter((item) => item.amount > 0);

  private getAllExpenses = (unsortedBudgetItems: BudgetItem[]) =>
    unsortedBudgetItems.filter((item) => item.amount < 0);

  private getALlTypes = (unsortedBudgetItems: BudgetItem[]) =>
    unsortedBudgetItems
      .filter((item) => item.amount < 0)
      .map((item) => item.type)
      .filter((value, index, self) => self.indexOf(value) === index) as Type[];

  private getAllCategories = (unsortedBudgetItems: BudgetItem[]) =>
    unsortedBudgetItems
      .filter((item) => item.amount < 0)
      .map((item) => item.category)
      .filter(
        (value, index, self) => self.indexOf(value) === index
      ) as Category[];

  private sumExpenses(expenses: BudgetItem[]) {
    return expenses
      .filter((item) => item.amount < 0)
      .map((income) => income.amount)
      .reduce((sum, current) => sum + current);
  }
}

export default Budget;
