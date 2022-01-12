import BudgetRepositoryInt from "../BudgetRepositoryInt";
import Budget from "../../model/Budget";
import axios, { AxiosRequestConfig } from "axios";
import { HistoryApiResponse } from "../../model/api/HistoryApiResponse";
import { BudgetApiDto } from "../../model/api/BudgetApiDto";

export default class AxiosBudgetRepository implements BudgetRepositoryInt {
  async getBySlug(slug: String): Promise<Budget> {
    const url = `${(process.env.API_BUDGET && process.env.API_BUDGET) || "http://localhost:8080/budgets"}/${slug}`;
    const config: AxiosRequestConfig = { url: url, method: "GET" };
    const data = await this.sendRequest(config);
    return Budget.fromApiResponse(data);
  }

  async getLatest(): Promise<Budget> {
    const url = (process.env.API_LATEST && process.env.API_LATEST) || "http://localhost:8080/budgets/latest";
    const config: AxiosRequestConfig = { url: url, method: "GET" };
    const data = await this.sendRequest(config);
    console.log(Budget.fromApiResponse(data));
    return Budget.fromApiResponse(data);
  }

  async getHistory(): Promise<HistoryApiResponse[]> {
    const url = (process.env.API_HISTORY && process.env.API_HISTORY) || "http://localhost:8080/budgets/history";
    const config: AxiosRequestConfig = { url: url, method: "GET" };
    return (await this.sendRequest(config)) as HistoryApiResponse[];
  }

  async saveBudget(budget: Budget): Promise<void> {
    const budgetDto = BudgetApiDto.fromBudget(budget);
    const url =
      (process.env.NEXT_PUBLIC_BUDGET_API && process.env.NEXT_PUBLIC_BUDGET_API) || "http://localhost:8080/budgets";
    const config: AxiosRequestConfig = { url: url, method: "POST", data: budgetDto };
    return await this.sendRequest(config);
  }

  private async sendRequest(config: AxiosRequestConfig) {
    try {
      const response = await axios.request(config);

      if (response.status == 200 && response.data) {
        return response.data;
      } else {
        throw new Error(`${response.status} : ${response.data}`);
      }
    } catch (error: any) {
      console.error(error);
      throw new Error("Server error." + error.message);
    }
  }
}
