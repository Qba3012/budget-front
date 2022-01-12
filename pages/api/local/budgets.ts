import { NextApiRequest, NextApiResponse } from "next";
import { LocalBudgetRepository } from "../../../repository/impl/LocalBudgetRepository";

const newBudgetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST" && process.env.REPOSITORY === "local") {
    try {
      const repository = new LocalBudgetRepository();
      const budget = await repository.persistBudget(req.body);
      res.status(200).json(budget);
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  }
};

export default newBudgetHandler;
