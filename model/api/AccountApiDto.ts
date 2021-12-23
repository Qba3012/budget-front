export class AccountApiDto {
  id: string;
  title: string;
  amount: number;

  constructor(id: string, title: string, amount: number) {
    this.id = id;
    this.title = title;
    this.amount = amount;
  }
}