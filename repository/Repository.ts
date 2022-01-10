import BudgetRepositoryFactory from "./BudgetRepositoryFactory";
import BudgetRepositoryInt from "./BudgetRepositoryInt";

const client = (process.env.REPOSITORY && process.env.REPOSITORY) || "local";

class Repository {
  static readonly budget: BudgetRepositoryInt = BudgetRepositoryFactory.createBudgetRepository(client);
}

export default Repository;
