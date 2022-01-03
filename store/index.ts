import { configureStore } from "@reduxjs/toolkit";
import csvImportSlice from "./csv-import-slice";
import importReviewSlice from "./import-review-slice";
import summarySlice from "./summary-slice";

const store = configureStore({
  reducer: {
    csvImport: csvImportSlice.reducer,
    review: importReviewSlice.reducer,
    summary: summarySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
