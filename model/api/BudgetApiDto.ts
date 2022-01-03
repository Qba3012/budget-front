import Budget from "../Budget";
import Type from "../Type";
import Category from "../Category";
import { IncomeApiDto } from "./IncomeApiDto";
import { AccountApiDto } from "./AccountApiDto";
import { ExpenseApiDto } from "./ExpenseApiDto";

export class BudgetApiDto {
  id: number;
  slug: string;
  month: number;
  year: number;
  accounts: AccountApiDto[];
  expenses: ExpenseApiDto[];
  incomes: IncomeApiDto[];

  private constructor(
    slug: string,
    month: number,
    year: number,
    accounts: AccountApiDto[],
    expenses: ExpenseApiDto[],
    incomes: IncomeApiDto[]
  ) {
    this.id = 0;
    this.slug = slug;
    this.month = month;
    this.year = year;
    this.accounts = accounts;
    this.expenses = expenses;
    this.incomes = incomes;
  }

  public static fromBudget(budget: Budget) {
    const accounts = budget.accounts.map(
      (account) => new AccountApiDto(account.id, account.title, account.amount)
    );
    const incomes = budget.incomes.map(
      (income) =>
        new IncomeApiDto(income.id, income.title, income.amount, income.date)
    );
    const expenses = budget.expenses
      .flatMap((typeSorted) => typeSorted.list)
      .flatMap((categorySorted) => categorySorted.sublist)
      .map(
        (item) =>
          new ExpenseApiDto(
            item.id,
            item.title,
            item.amount,
            item.date,
            (item.type && item.type) || Type.REGULAR,
            (item.category && item.category) || Category.TRAVEL
          )
      );
    return new BudgetApiDto(
      budget.slug,
      budget.month,
      budget.year,
      accounts,
      expenses,
      incomes
    );
  }
}
