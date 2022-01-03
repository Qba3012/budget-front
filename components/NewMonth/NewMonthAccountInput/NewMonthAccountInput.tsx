import CancelIcon from "@mui/icons-material/Cancel";
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";
import { AccountItem } from "../../../model/AccountItem";
import { useAppSelector } from "../../../store/hooks";
import { addAccount, getBudget, removeAccount, setAccountAmount, setAccountTitle } from "../../../store/summary-slice";

const NewMonthAccountInput: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const budget = useAppSelector(getBudget);

  const handleAmountChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: string) => {
    dispatch(setAccountAmount({ id: id, amount: event.target.value }));
  };

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: string) => {
    dispatch(setAccountTitle({ id: id, title: event.target.value }));
  };

  const createRow = (item: AccountItem, index: number) => {
    return (
      <TableRow key={`row-${index}`}>
        <TableCell key={`item-title-${index}`}>
          <TextField
            id={`item-title-input-${index}`}
            fullWidth
            value={item.title}
            onChange={(event) => handleTitleChange(event, item.id)}
          />
        </TableCell>
        <TableCell key={`item-amount-${index}`}>
          <TextField
            id={`item-amount-input-${index}`}
            fullWidth
            value={item.amount}
            onChange={(event) => handleAmountChange(event, item.id)}
            type={"number"}
          />
        </TableCell>
        <TableCell key={`delete-${index}`} align={"right"}>
          <IconButton
            color="error"
            onClick={() => {
              dispatch(removeAccount(item.id));
            }}>
            <CancelIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  const createTable = () => {
    if (budget.accounts && budget.accounts.length != 0) {
      return (
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow key={"header"}>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>{budget.accounts.map((row, index) => createRow(row, index))}</TableBody>
          </Table>
        </TableContainer>
      );
    }
  };

  const createTotalSum = () => {
    if (budget.accounts && budget.accounts.length != 0) {
      return (
        <Grid item container xs={4} mt={2} justifyContent={"space-between"}>
          <Typography variant={"h6"}>Total</Typography>
          <Typography variant={"h6"}>
            {budget.accounts.map((account) => account.amount).reduce((sum, current) => sum + current)}
          </Typography>
        </Grid>
      );
    }
  };

  return (
    <Card sx={{ marginTop: 5 }}>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant={"h4"} sx={{ color: theme.palette.primary.main }}>
              Accounts
            </Typography>
            <Typography mt={2}>
              Adding all your accounts will help you to track total value of your assets in time
            </Typography>
          </Grid>
          <Grid item container justifyContent={"flex-end"} alignItems="start" xs={6}>
            <Button variant={"contained"} size={"large"} onClick={() => dispatch(addAccount())}>
              Add new
            </Button>
          </Grid>
        </Grid>
        {createTable()}
        {createTotalSum()}
      </CardContent>
    </Card>
  );
};

export default NewMonthAccountInput;
