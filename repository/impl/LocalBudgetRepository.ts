import BudgetRepositoryInt from "../BudgetRepositoryInt";
import Budget from "../../model/Budget";
import { HistoryApiResponse } from "../../model/api/HistoryApiResponse";
import fs from "fs";
import axios from "axios";

export class LocalBudgetRepository implements BudgetRepositoryInt {
  private readonly filePath = "data/budgets.json";

  private readFile(): Budget[] {
    const data = fs.readFileSync(this.filePath, { encoding: "utf-8" });
    return JSON.parse(data);
  }

  private saveFile(data: Budget[]) {
    fs.writeFileSync(this.filePath, JSON.stringify(data));
  }

  async getBySlug(slug: String): Promise<Budget> {
    const budgets = this.readFile();
    const budget = budgets.find((b) => b.slug == slug);
    if (budget) {
      return Promise.resolve(budget);
    } else {
      throw new Error("No budgets available");
    }
  }

  async getHistory(): Promise<HistoryApiResponse[]> {
    const budgets = this.readFile();
    const history = [] as HistoryApiResponse[];
    budgets.forEach((b) => {
      const historyItem = history.find((h) => h.year == b.year);
      if (historyItem) {
        historyItem.months.push({ month: b.month, slug: b.slug });
      } else {
        history.push({ year: b.year, months: [{ month: b.month, slug: b.slug }] });
      }
    });
    return Promise.resolve(history);
  }

  async getLatest(): Promise<Budget> {
    const budgets = this.readFile();
    const sortedBudgets = budgets.sort((a, b) => {
      if (a.year > b.year) return 1;
      if (a.year < b.year) return -1;
      if (a.year == b.year) {
        if (a.month > b.month) return 1;
        if (a.month < b.month) return -1;
        if (a.month == b.month) return 0;
      }
      return 0;
    });
    const budget = sortedBudgets.pop();
    if (budget) {
      return Promise.resolve(budget);
    } else {
      throw new Error("No budgets available");
    }
  }

  async persistBudget(budget: Budget) {
    const budgets = this.readFile();
    const existingBudget = budgets.find((b) => b.slug == budget.slug);
    if (!existingBudget) {
      budgets.push(budget);
      this.saveFile(budgets);
    } else {
      throw new Error("Budget with given slug already exist");
    }
    return Promise.resolve(budget);
  }

  async saveBudget(budget: Budget) {
    const url = `${process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "http://localhost:3000"}/api/local/budgets`;
    try {
      const response = await axios.post(url, budget);
      if (response.status !== 200) {
        throw new Error(`${response.status} : ${response.data}`);
      }
      return Promise.resolve(response.data);
    } catch (error: any) {
      console.error("Api request failed");
      throw new Error(`${error.response.status} : ${error.response.data}`);
    }
  }
}
