import { FC } from "react";
import { Box, Button, Card, CardContent, Divider, Typography, useTheme } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { NEW_MONTH_REVIEW_PATH } from "../../pages/new-month/review";

type Props = {
  allIncomesValue: number;
  allExpensesValue: number;
  month: string;
  handleSaveAction?: () => Promise<void | undefined>;
};

const MonthHeaderSummary: FC<Props> = ({ allIncomesValue, allExpensesValue, month, handleSaveAction }) => {
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}>
          <Typography variant={"h4"} sx={{ flexGrow: 1 }}>
            {month}
          </Typography>
        </Box>
        {handleSaveAction && (
          <>
            <Button
              variant={"outlined"}
              href={NEW_MONTH_REVIEW_PATH}
              sx={{ marginRight: 2, marginTop: 2, width: "15%" }}>
              Edit
            </Button>
            <Button variant={"contained"} sx={{ marginTop: 2, width: "15%" }} onClick={handleSaveAction}>
              Save
            </Button>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 8,
          }}>
          <AttachMoneyOutlinedIcon
            fontSize={"large"}
            sx={{
              backgroundColor: theme.palette.warning.light,
              color: theme.palette.warning.main,
              borderRadius: "50%",
              padding: "1rem",
              width: "4rem",
              height: "4rem",
              marginRight: 5,
            }}
          />
          <Typography variant={"h6"}>Expenses</Typography>
          <Typography variant={"h4"} sx={{ flexGrow: 1, color: theme.palette.warning.main }} textAlign="end">
            {allExpensesValue && allExpensesValue.toLocaleString()}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 5, marginBottom: 5 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 5,
          }}>
          <AccountBalanceWalletOutlinedIcon
            fontSize={"large"}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.secondary.main,
              borderRadius: "50%",
              padding: "1rem",
              width: "4rem",
              height: "4rem",
              marginRight: 5,
            }}
          />
          <Typography variant={"h6"}>Incomes</Typography>
          <Typography variant={"h4"} sx={{ flexGrow: 1, color: theme.palette.secondary.main }} textAlign="end">
            {allIncomesValue && allIncomesValue.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthHeaderSummary;
