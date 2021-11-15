import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { ParseResult } from "papaparse";
import BudgetItem from "../model/BudgetItem";
import BudgetItemField from "../model/BudgetItemField";
import { SELECT_PLACEHOLDER } from "../utils/Constants";
import Type from "../model/Type";
import Category from "../model/Category";
import { RootState } from "./index";
import { BudgetInterface } from "../model/BudgetInterface";
import Budget from "../model/Budget";
import { AccountItem } from "../model/AccountItem";

type INITIAL_STATE_TYPE = {
  csvData: ParseResult<string>[] | null;
  columnsCount: number;
  columnLabels: string[];
  budgetItems: BudgetItem[];
  budget: BudgetInterface;
};

const INITIAL_STATE: INITIAL_STATE_TYPE = {
  csvData: null,
  columnsCount: 0,
  columnLabels: [],
  budgetItems: [],
  budget: {} as BudgetInterface,
};

const newMonthSlice = createSlice({
  name: "newMonth",
  initialState: INITIAL_STATE,
  reducers: {
    setData: {
      reducer(
        state,
        action: PayloadAction<{
          csvData: ParseResult<string>[] | null;
          columnsCount: number;
        }>
      ) {
        state.csvData = action.payload.csvData;
        state.columnsCount = action.payload.columnsCount;
      },
      prepare(results: ParseResult<string>[] | null) {
        const csvData = results
          ? results.filter((result) => result.data.length > 2)
          : null;
        const columnsCount = results
          ? Math.max(
              ...results.map((value: ParseResult<String>) => value.data.length)
            )
          : 0;
        return {
          payload: {
            csvData: csvData,
            columnsCount: columnsCount,
          },
        };
      },
    },
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
    setAccountTitle(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      const account = selectAccountItemById(state, action.payload.id);
      const text = action.payload.title.trim();
      if (account && text != "") {
        account.title = text;
      }
    },
    setAccountAmount(
      state,
      action: PayloadAction<{ id: string; amount: string }>
    ) {
      const amountValue = Number(action.payload.amount);
      const account = selectAccountItemById(state, action.payload.id);
      if (account && !isNaN(amountValue)) {
        account.amount = Math.round((amountValue + Number.EPSILON) * 100) / 100;
      }
    },
    setColumnLabel(
      state,
      action: PayloadAction<{ index: number; selection: string }>
    ) {
      state.columnLabels[action.payload.index] = action.payload.selection;
    },
    setBudgetItemDate(
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) {
      const updatedBudgetItem = selectBudgetItemById(state, action.payload.id);
      const text = action.payload.date.trim();
      if (updatedBudgetItem && text != "") {
        updatedBudgetItem.date = text;
      }
    },
    setBudgetItemTitle(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      const updatedBudgetItem = selectBudgetItemById(state, action.payload.id);
      const text = action.payload.title.trim();
      if (updatedBudgetItem && text) {
        updatedBudgetItem.title = text;
      }
    },
    setBudgetItemAmount(
      state,
      action: PayloadAction<{ id: string; amount: string }>
    ) {
      const amountValue = Number(action.payload.amount);
      const updatedBudgetItem = selectBudgetItemById(state, action.payload.id);
      if (updatedBudgetItem && !isNaN(amountValue)) {
        updatedBudgetItem.amount =
          Math.round((amountValue + Number.EPSILON) * 100) / 100;
      }
    },
    setBudgetItemType(
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) {
      const updatedBudgetItem = selectBudgetItemById(state, action.payload.id);
      if (updatedBudgetItem) {
        updatedBudgetItem.type =
          action.payload.type == SELECT_PLACEHOLDER
            ? null
            : Type[action.payload.type.toUpperCase() as keyof typeof Type];
      }
    },
    setBudgetItemCategory(
      state,
      action: PayloadAction<{ id: string; category: string }>
    ) {
      const updatedBudgetItem = selectBudgetItemById(state, action.payload.id);
      if (updatedBudgetItem) {
        updatedBudgetItem.category =
          action.payload.category == SELECT_PLACEHOLDER
            ? null
            : Category[
                action.payload.category.toUpperCase() as keyof typeof Category
              ];
      }
    },
    convertToBudgetItems(state) {
      if (!state.csvData) {
        return;
      }
      state.budgetItems = state.csvData.map((row) => {
        const dateIndex = state.columnLabels.indexOf(BudgetItemField.DATE);
        const titleIndex = state.columnLabels.indexOf(BudgetItemField.TITLE);
        const amountIndex = state.columnLabels.indexOf(BudgetItemField.AMOUNT);
        const amount = Number.parseFloat(
          row.data[amountIndex].replaceAll(" ", "").replaceAll(",", ".")
        );
        return {
          ...new BudgetItem(
            row.data[dateIndex],
            row.data[titleIndex],
            isNaN(amount) ? 0 : amount
          ),
        };
      });
    },
    populateBudget(state, action: PayloadAction<Date>) {
      state.budget = { ...new Budget(action.payload, state.budgetItems) };
    },
  },
});

const selectAccountItemById = (state: Draft<INITIAL_STATE_TYPE>, id: string) =>
  state.budget.accounts.find((el) => el.id == id);

const selectBudgetItemById = (state: Draft<INITIAL_STATE_TYPE>, id: string) =>
  state.budgetItems.find((el) => el.id == id);

export const getCsvData = (state: RootState) => state.newMonth.csvData;
export const getColumnLabels = (state: RootState) =>
  state.newMonth.columnLabels;
export const getColumnsCount = (state: RootState) =>
  state.newMonth.columnsCount;
export const getAllBudgetItems = (state: RootState) =>
  state.newMonth.budgetItems;
export const getBudget = (state: RootState) => state.newMonth.budget;

export const {
  setData,
  populateBudget,
  setColumnLabel,
  addAccount,
  setAccountAmount,
  setAccountTitle,
  removeAccount,
  setBudgetItemCategory,
  convertToBudgetItems,
  setBudgetItemTitle,
  setBudgetItemAmount,
  setBudgetItemDate,
  setBudgetItemType,
} = newMonthSlice.actions;

export default newMonthSlice;
