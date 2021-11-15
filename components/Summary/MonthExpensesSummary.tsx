import { FC, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { toCapitalCase } from "../../utils/Utils";
import CustomRadialChart from "../Charts/CustomRadialChart";
import SortedBudgetItemsList from "./SortedBudgetItems/SortedBudgetItemsList";
import { TypeSortedBudget } from "../../model/BudgetInterface";

type Props = {
  expenses: TypeSortedBudget[];
};

const MonthExpensesSummary: FC<Props> = ({ expenses }) => {
  const [typeSelection, setTypeSelection] = useState(0);
  const theme = useTheme();

  return (
    <Card sx={{ marginTop: 5 }}>
      <CardContent>
        <Typography variant={"h4"} sx={{ color: theme.palette.warning.main }}>
          Expenses
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: 5,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {expenses.map((item) => (
              <Box
                key={item.type}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                }}
              >
                <Typography variant={"h6"}>
                  {toCapitalCase(item.type)}
                </Typography>
                <Typography variant={"h5"}>
                  {item.sum.toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ flexGrow: 2, display: "flex", justifyContent: "center" }}>
            <CustomRadialChart
              data={expenses}
              selection={expenses[typeSelection]?.type}
            />
          </Box>
        </Box>
        <Tabs
          value={typeSelection}
          onChange={(event, value) => {
            setTypeSelection(value);
          }}
          sx={{
            marginTop: 5,
            marginLeft: -4,
            marginRight: -4,
            borderBottom: "1px solid",
            borderTop: "1px solid",
            borderColor: theme.palette.grey["200"],
          }}
        >
          {expenses.map((item) => (
            <Tab
              key={item.type}
              label={item.type}
              sx={{
                padding: "1.5rem",
                paddingBottom: "1.5rem",
                fontSize: theme.typography.fontSize,
                fontWeight: theme.typography.fontWeightBold,
              }}
            />
          ))}
        </Tabs>
        <Box>
          {
            expenses.map((typeSortedBudget) => (
              <SortedBudgetItemsList
                key={typeSortedBudget.type}
                typeSortedBudget={typeSortedBudget}
              />
            ))[typeSelection]
          }
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthExpensesSummary;
