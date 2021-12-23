export class ExpenseApiDto {
  id: string;
  title: string;
  amount: number;
  date: string;
  expenseType: string;
  expenseCategory: string;

  constructor(
    id: string,
    title: string,
    amount: number,
    date: string,
    expenseType: string,
    expenseCategory: string
  ) {
    this.id = id;
    this.title = title;
    this.amount = amount;
    this.date = new Date(date).toISOString();
    this.expenseType = expenseType;
    this.expenseCategory = expenseCategory;
  }
}