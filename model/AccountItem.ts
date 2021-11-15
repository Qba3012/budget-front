import { v4 } from "uuid";

export class AccountItem {
  id: string;
  title: string;
  amount: number;

  constructor(title: string, amount: number) {
    this.id = v4();
    this.title = title;
    this.amount = amount;
  }
}
