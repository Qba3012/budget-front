import Budget from "../model/Budget";
import { HistoryApiResponse } from "../model/api/HistoryApiResponse";

export default interface BudgetRepositoryInt {
  getHistory(): Promise<HistoryApiResponse[]>;
  getLatest(): Promise<Budget>;
  getBySlug(slug: String): Promise<Budget>;
  saveBudget(budget: Budget): void;
}
