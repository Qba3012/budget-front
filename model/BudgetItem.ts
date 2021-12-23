import Type, { typeFromString } from "./Type";
import Category, { categoryFromString } from "./Category";
import { v4 } from "uuid";

class BudgetItem {
  id: string;
  date: string;
  title: string;
  amount: number;
  type: Type | null;
  category: Category | null;

  constructor(
    date: string,
    title: string,
    amount: number,
    type?: string,
    category?: string
  ) {
    this.id = v4();
    this.date = new Date(date.replace(/\s+/g, " ").trim()).toLocaleDateString();
    this.title = title.replace(/\s+/g, " ").trim();
    this.amount = amount;
    this.type = type ? typeFromString(type) : null;
    this.category = category ? categoryFromString(category) : null;
  }
}

export default BudgetItem;
