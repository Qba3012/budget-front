import BudgetRepositoryInt from "../BudgetRepositoryInt";
import Budget from "../../model/Budget";
import axios from "axios";
import { HistoryApiResponse } from "../../model/api/HistoryApiResponse";
import { BudgetApiDto } from "../../model/api/BudgetApiDto";

export default class AxiosBudgetRepository implements BudgetRepositoryInt {
  async getBySlug(slug: String): Promise<Budget> {
    const url = `${(process.env.API_BUDGET && process.env.API_BUDGET) || "http://localhost:8080/budgets"}/${slug}`;
    const data = await this.sendRequest(url);
    return Budget.fromApiResponse(data);
  }

  async getLatest(): Promise<Budget> {
    const url = (process.env.API_LATEST && process.env.API_LATEST) || "http://localhost:8080/budgets/latest";
    const data = await this.sendRequest(url);
    return Budget.fromApiResponse(data);
  }

  async getHistory(): Promise<HistoryApiResponse[]> {
    const url = (process.env.API_HISTORY && process.env.API_HISTORY) || "http://localhost:8080/budgets/history";
    return (await this.sendRequest(url)) as HistoryApiResponse[];
  }

  private async sendRequest(url: string) {
    const response = await axios.get(url);

    if (response.status == 200 && response.data) {
      return response.data;
    } else {
      throw new Error(`${response.status} : ${response.data}`);
    }
  }

  async saveBudget(budget: Budget): Promise<void> {
    const budgetDto = BudgetApiDto.fromBudget(budget);
    axios
      .post(
        (process.env.NEXT_PUBLIC_BUDGET_API && process.env.NEXT_PUBLIC_BUDGET_API) || "http://localhost:8080/budgets",
        budgetDto
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        throw new Error(`${error.status} : ${error.data}`);
      });

    //
    // console.log(response);
    // if (response.status !== 200 || !response.data) {
    //   throw new Error(`${response.status} : ${response.data}`);
    // }
  }
}
