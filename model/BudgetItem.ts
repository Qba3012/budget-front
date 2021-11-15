import Type from "./Type";
import Category from "./Category";
import { v4 } from "uuid";

class BudgetItem {
  id: string;
  date: string;
  title: string;
  amount: number;
  type: Type | null;
  category: Category | null;

  constructor(date: string, title: string, amount: number) {
    this.id = v4();
    this.date = date.replace(/\s+/g, " ").trim();
    this.title = title.replace(/\s+/g, " ").trim();
    this.amount = amount;
    this.type = Type.REGULAR;
    this.category = Category.TRAVEL;
  }
}

export default BudgetItem;
