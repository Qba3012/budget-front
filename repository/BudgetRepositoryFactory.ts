import BudgetRepositoryInt from "./BudgetRepositoryInt";
import AxiosBudgetRepository from "./impl/AxiosBudgetRepository";
import { LocalBudgetRepository } from "./impl/LocalBudgetRepository";

export default class BudgetRepositoryFactory {
  static createBudgetRepository(client: String): BudgetRepositoryInt {
    switch (client) {
      case "local":
        return new LocalBudgetRepository();
      default: {
        return new AxiosBudgetRepository();
      }
    }
  }
}
