import BudgetItem from "./BudgetItem";
import Type from "./Type";
import Category from "./Category";
import { AccountItem } from "./AccountItem";

export const checkTypeOrCategorySortedBudget = (
  item: TypeSortedBudget | CategorySortedBudget
): item is TypeSortedBudget => {
  return !!(item as TypeSortedBudget).type;
};

export type TypeSortedBudget = {
  type: Type;
  sum: number;
  list: CategorySortedBudget[];
};

export type CategorySortedBudget = {
  category: Category;
  sum: number;
  sublist: BudgetItem[];
};

export interface BudgetInterface {
  month: number;
  year: number;
  dateLabel: string;
  totalIncomesValue: number;
  totalExpensesValue: number;
  totalAccountsValue: number;
  accounts: AccountItem[];
  incomes: BudgetItem[];
  expenses: TypeSortedBudget[];
}
