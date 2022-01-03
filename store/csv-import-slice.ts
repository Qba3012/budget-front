import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParseResult } from "papaparse";
import { RootState } from "./index";

type INITIAL_STATE_TYPE = {
  csvData: ParseResult<string>[] | null;
  columnLabels: string[];
};

const INITIAL_STATE: INITIAL_STATE_TYPE = {
  csvData: null,
  columnLabels: [],
};

const csvImportSlice = createSlice({
  name: "csv-import",
  initialState: INITIAL_STATE,
  reducers: {
    setData: {
      reducer(
        state,
        action: PayloadAction<{
          csvData: ParseResult<string>[] | null;
        }>
      ) {
        state.csvData = action.payload.csvData;
      },
      prepare(results: ParseResult<string>[] | null) {
        const csvData = results ? results.filter((result) => result.data.length > 2) : null;
        return {
          payload: {
            csvData: csvData,
          },
        };
      },
    },
    setColumnLabel(state, action: PayloadAction<{ index: number; selection: string }>) {
      state.columnLabels[action.payload.index] = action.payload.selection;
    },
  },
});

export const getCsvData = (state: RootState) => state.csvImport.csvData;
export const getColumnLabels = (state: RootState) => state.csvImport.columnLabels;
export const getColumnsCount = (state: RootState) =>
  state.csvImport.csvData
    ? Math.max(...state.csvImport.csvData.map((value: ParseResult<String>) => value.data.length))
    : 0;

export const { setData, setColumnLabel } = csvImportSlice.actions;

export default csvImportSlice;
