import { configureStore } from "@reduxjs/toolkit";
import newMonthSlice from "./new-month-slice";

const store = configureStore({
  reducer: {
    newMonth: newMonthSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
