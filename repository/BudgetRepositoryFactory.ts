import BudgetRepositoryInt from "./BudgetRepositoryInt";
import AxiosBudgetRepository from "./axios/AxiosBudgetRepository";

export default class BudgetRepositoryFactory {

  static createBudgetRepository(client: String): BudgetRepositoryInt {
      switch(client) {
        default: { return new AxiosBudgetRepository()}
      }
  }


}
