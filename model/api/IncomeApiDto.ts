export class IncomeApiDto {
  id: string;
  title: string;
  amount: number;
  date: string;

  constructor(id: string, title: string, amount: number, date: string) {
    this.id = id;
    this.title = title;
    this.amount = amount;
    this.date = new Date(date).toISOString();
  }
}