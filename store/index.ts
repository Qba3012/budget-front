import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./history-slice";
import newMonthSlice from "./new-month-slice";

const store = configureStore({
  reducer: {
    newMonth: newMonthSlice.reducer,
    history: historySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
