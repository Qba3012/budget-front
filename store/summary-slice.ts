import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { BudgetInterface } from "../model/BudgetInterface";
import { AccountItem } from "../model/AccountItem";

type INITIAL_STATE_TYPE = {
  budget: BudgetInterface;
};

const INITIAL_STATE: INITIAL_STATE_TYPE = {
  budget: {} as BudgetInterface,
};

const summarySlice = createSlice({
  name: "summary",
  initialState: INITIAL_STATE,
  reducers: {
    removeAccount(state, action: PayloadAction<string>) {
      const account = selectAccountItemById(state, action.payload);
      if (account) {
        const index = state.budget.accounts.indexOf(account);
        state.budget.accounts.splice(index);
      }
    },
    addAccount(state) {
      state.budget.accounts.unshift({ ...new AccountItem("", 0) });
    },
    setAccountTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      const account = selectAccountItemById(state, action.payload.id);
      const text = action.payload.title.trim();
      if (account && text != "") {
        account.title = text;
      }
    },
    setAccountAmount(state, action: PayloadAction<{ id: string; amount: string }>) {
      const amountValue = Number(action.payload.amount);
      const account = selectAccountItemById(state, action.payload.id);
      if (account && !isNaN(amountValue)) {
        account.amount = Math.round((amountValue + Number.EPSILON) * 100) / 100;
      }
    },
    setBudget(state, action: PayloadAction<BudgetInterface>) {
      state.budget = action.payload;
    },
  },
});

const selectAccountItemById = (state: Draft<INITIAL_STATE_TYPE>, id: string) =>
  state.budget.accounts.find((el) => el.id == id);

export const getBudget = (state: RootState) => state.summary.budget;

export const { setBudget, addAccount, setAccountAmount, setAccountTitle, removeAccount } = summarySlice.actions;

export default summarySlice;
