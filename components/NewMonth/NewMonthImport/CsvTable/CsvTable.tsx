import { ChangeEvent, FC } from "react";
import { ParseResult } from "papaparse";
import {
  Card,
  CardContent,
  IconButton,
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
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import BudgetItemField from "../../../../model/BudgetItemField";
import { SELECT_PLACEHOLDER } from "../../../../utils/Constants";
import {
  getColumnLabels,
  getColumnsCount,
  getCsvData,
  setColumnLabel,
  setData,
} from "../../../../store/new-month-slice";

const CsvTable: FC = () => {
  const data = useSelector(getCsvData);
  const columnLabels = useSelector(getColumnLabels);
  const columnsCount = useSelector(getColumnsCount);
  const dispatch = useDispatch<AppDispatch>();

  const headerOptions = [
    SELECT_PLACEHOLDER,
    BudgetItemField.DATE,
    BudgetItemField.TITLE,
    BudgetItemField.AMOUNT,
  ];

  const handleDeleteFromTable = (deleteIndex: number) => {
    const newData = data!.filter((el, index) => index != deleteIndex);
    dispatch(setData(newData));
  };

  const handleSelectionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    dispatch(setColumnLabel({ index: index, selection: event.target.value }));
  };

  const createRow = (row: ParseResult<string>, rowIndex: number) => {
    return (
      <TableRow key={`row-${rowIndex}`}>
        {row.data.map((cell, index) => (
          <TableCell key={`data-cell-${rowIndex}-${index}`}>{cell}</TableCell>
        ))}
        <TableCell key={`delete-${rowIndex}`} align={"right"}>
          <IconButton
            color="error"
            onClick={() => {
              handleDeleteFromTable(rowIndex);
            }}
          >
            <CancelIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  const createHeaderDropDowns = (columnCount: number) => {
    const headerCells = [];
    for (let i = 0; i < columnCount; i++) {
      headerCells.push(
        <TableCell key={`header-dropdown-${i}`}>
          <TextField
            id="data-type"
            select
            fullWidth
            value={columnLabels[i] ? columnLabels[i] : headerOptions[0]}
            onChange={(event) => handleSelectionChange(event, i)}
          >
            {headerOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </TableCell>
      );
    }
    headerCells.push(<TableCell key={"header-delete-empty-cell"} />);
    return headerCells;
  };

  const renderTable = (data: ParseResult<string>[]) => {
    return (
      <TableContainer sx={{ marginTop: 5 }}>
        <Table>
          <TableHead>
            <TableRow key={"header"}>
              {createHeaderDropDowns(columnsCount)}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => createRow(row, index))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant={"h6"}>Adjust imported data:</Typography>
        <Typography mt={2} ml={5}>
          Remove items you would like to exclude from the budget
        </Typography>
        <Typography mt={2} ml={5}>
          Assign labels: title, amount and date to the correct columns
        </Typography>
        {renderTable(data!)}
      </CardContent>
    </Card>
  );
};

export default CsvTable;
