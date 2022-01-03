import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import BudgetItem from "../../../model/BudgetItem";
import Type from "../../../model/Type";
import Category from "../../../model/Category";
import EditableText from "../../EditableText/EditableText";
import { SELECT_PLACEHOLDER } from "../../../utils/Constants";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CalendarTodayOutlined } from "@mui/icons-material";
import { NEW_MONTH_SUMMARY_PATH } from "../../../pages/new-month/summary";
import BudgetItemField from "../../../model/BudgetItemField";
import { getColumnLabels, getCsvData } from "../../../store/csv-import-slice";
import {
  getAllBudgetItems,
  setBudgetItemAmount,
  setBudgetItemCategory,
  setBudgetItemDate,
  setBudgetItemTitle,
  setBudgetItemType,
  setData,
} from "../../../store/import-review-slice";

const months = [] as string[];

for (let i = 0; i < 12; i++) {
  const today = new Date();
  today.setMonth(today.getMonth() - i);
  months[i] = today.toLocaleDateString("en-EN", {
    month: "long",
    year: "numeric",
  });
}

const NewMonthReview: FC = () => {
  const [month, setMonth] = useState(months[0]);
  const csvData = useAppSelector(getCsvData);
  const columnLabels = useAppSelector(getColumnLabels);
  const budgetItems = useAppSelector(getAllBudgetItems);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const types = [SELECT_PLACEHOLDER, Type.REGULAR, Type.VARIABLE];

  const categories = [SELECT_PLACEHOLDER, Category.CAR, Category.GROCERY, Category.MEDICAL, Category.TRAVEL];

  useEffect(() => {
    if (!csvData) {
      return;
    }
    const budgetItems = csvData.map((row) => {
      const dateIndex = columnLabels.indexOf(BudgetItemField.DATE);
      const titleIndex = columnLabels.indexOf(BudgetItemField.TITLE);
      const amountIndex = columnLabels.indexOf(BudgetItemField.AMOUNT);
      const amount = Number.parseFloat(row.data[amountIndex].replaceAll(" ", "").replaceAll(",", "."));
      return {
        ...new BudgetItem(row.data[dateIndex], row.data[titleIndex], isNaN(amount) ? 0 : amount),
      };
    });
    dispatch(setData(budgetItems));
  }, []);

  const handleDateChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: string) => {
    dispatch(setBudgetItemDate({ id: id, date: event.target.value }));
  };

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: string) => {
    dispatch(setBudgetItemTitle({ id: id, title: event.target.value }));
  };

  const handleAmountChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: string) => {
    dispatch(setBudgetItemAmount({ id: id, amount: event.target.value }));
  };

  const handleTypeChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: string) => {
    dispatch(setBudgetItemType({ id: id, type: event.target.value }));
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: string) => {
    dispatch(setBudgetItemCategory({ id: id, category: event.target.value }));
  };

  const handleButtonClick = () => {
    const error = budgetItems.find((item) => (item.type === null || item.category === null) && item.amount < 0);
    if (error) {
      enqueueSnackbar("Each budget item must have type and category", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
      return;
    }
    router.push(NEW_MONTH_SUMMARY_PATH);
  };

  const createRow = (item: BudgetItem, index: number) => {
    return (
      <TableRow key={`row-${index}`}>
        <TableCell key={`item-date-${index}`}>
          <EditableText
            elementId={`item-date-input-${index}`}
            editId={item.id}
            text={item.date}
            onChange={handleDateChange}
          />
        </TableCell>
        <TableCell key={`item-title-${index}`}>
          <EditableText
            elementId={`item-title-input-${index}`}
            editId={item.id}
            text={item.title}
            onChange={handleTitleChange}
          />
        </TableCell>
        <TableCell key={`item-amount-${index}`}>
          <EditableText
            elementId={`item-amount-input-${index}`}
            editId={item.id}
            isNumeric
            text={item.amount}
            onChange={handleAmountChange}
          />
        </TableCell>
        <TableCell key={`item-type-${index}`} align={"right"}>
          {item.amount < 0 && (
            <TextField
              id={`item-type-selection-${index}`}
              select
              fullWidth
              value={item.type ? item.type : types[0]}
              onChange={(event) => handleTypeChange(event, item.id)}>
              {types.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        </TableCell>
        <TableCell key={`item-category-${index}`} align={"right"}>
          {item.amount < 0 && (
            <TextField
              id={`item-category-selection-${index}`}
              select
              fullWidth
              placeholder={"-"}
              value={item.category ? item.category : categories[0]}
              onChange={(event) => handleCategoryChange(event, item.id)}>
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box display={"flex"} mb={5}>
            <Typography variant={"h6"} sx={{ flexGrow: 1 }}>
              Review imported data
            </Typography>
            <CalendarTodayOutlined fontSize={"large"} sx={{ color: "action.active", mr: 2, alignSelf: "center" }} />
            <TextField
              id={`item-date-selection`}
              select
              value={month}
              onChange={(event) => {
                setMonth(event.target.value);
              }}>
              {months.map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow key={"header"}>
                  <TableCell>Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{budgetItems.map((row, index) => createRow(row, index))}</TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Button variant={"contained"} size={"large"} fullWidth sx={{ marginTop: 5 }} onClick={handleButtonClick}>
        Save
      </Button>
    </>
  );
};

export default NewMonthReview;
