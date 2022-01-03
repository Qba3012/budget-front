import { MonthApiResponse } from "./MonthApiResponse";

export interface HistoryApiResponse {
  year: number;
  months: MonthApiResponse[];
}
