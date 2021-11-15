import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { BudgetInterface } from "../model/BudgetInterface";

type INITIAL_STATE_TYPE = {
  budgets: BudgetInterface[];
};

const INITIAL_STATE: INITIAL_STATE_TYPE = {
  budgets: [] as BudgetInterface[],
};

const historySlice = createSlice({
  name: "history",
  initialState: INITIAL_STATE,
  reducers: {
    addBudget(state, action: PayloadAction<BudgetInterface>) {
      state.budgets.push(action.payload);
    },
  },
});

export const getAllBudgets = (state: RootState) => state.history.budgets;

export const { addBudget } = historySlice.actions;

export default historySlice;
