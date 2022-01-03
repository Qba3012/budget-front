import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import BudgetItem from "../model/BudgetItem";
import { SELECT_PLACEHOLDER } from "../utils/Constants";
import { typeFromString } from "../model/Type";
import { categoryFromString } from "../model/Category";
import { RootState } from "./index";

type INITIAL_STATE_TYPE = {
  budgetItems: BudgetItem[];
};

const INITIAL_STATE: INITIAL_STATE_TYPE = {
  budgetItems: [],
};

const importReviewSlice = createSlice({
  name: "importReview",
  initialState: INITIAL_STATE,
  reducers: {
    setData(state, action: PayloadAction<BudgetItem[]>) {
      state.budgetItems = action.payload;
    },
    setBudgetItemDate(state, action: PayloadAction<{ id: string; date: string }>) {
      const updatedBudgetItem = selectBudgetItemById(state, action.payload.id);
      const text = action.payload.date.trim();
      if (updatedBudgetItem && text != "") {
        updatedBudgetItem.date = text;
      }
    },
    setBudgetItemTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      const updatedBudgetItem = selectBudgetItemById(state, action.payload.id);
      const text = action.payload.title.trim();
      if (updatedBudgetItem && text) {
        updatedBudgetItem.title = text;
      }
    },
    setBudgetItemAmount(state, action: PayloadAction<{ id: string; amount: string }>) {
      const amountValue = Number(action.payload.amount);
      const updatedBudgetItem = selectBudgetItemById(state, action.payload.id);
      if (updatedBudgetItem && !isNaN(amountValue)) {
        updatedBudgetItem.amount = Math.round((amountValue + Number.EPSILON) * 100) / 100;
      }
    },
    setBudgetItemType(state, action: PayloadAction<{ id: string; type: string }>) {
      const updatedBudgetItem = selectBudgetItemById(state, action.payload.id);
      if (updatedBudgetItem) {
        updatedBudgetItem.type =
          action.payload.type == SELECT_PLACEHOLDER ? null : typeFromString(action.payload.type.toUpperCase());
      }
    },
    setBudgetItemCategory(state, action: PayloadAction<{ id: string; category: string }>) {
      const updatedBudgetItem = selectBudgetItemById(state, action.payload.id);
      if (updatedBudgetItem) {
        updatedBudgetItem.category =
          action.payload.category == SELECT_PLACEHOLDER ? null : categoryFromString(action.payload.category);
      }
    },
  },
});

const selectBudgetItemById = (state: Draft<INITIAL_STATE_TYPE>, id: string) =>
  state.budgetItems.find((el) => el.id == id);

export const getAllBudgetItems = (state: RootState) => state.review.budgetItems;

export const {
  setData,
  setBudgetItemCategory,
  setBudgetItemTitle,
  setBudgetItemAmount,
  setBudgetItemDate,
  setBudgetItemType,
} = importReviewSlice.actions;

export default importReviewSlice;
