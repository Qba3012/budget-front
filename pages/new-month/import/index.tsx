import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import {
  convertToBudgetItems,
  getColumnLabels,
  getCsvData,
} from "../../../store/new-month-slice";
import CsvTable from "../../../components/NewMonth/NewMonthImport/CsvTable/CsvTable";
import BudgetItemField from "../../../model/BudgetItemField";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import CsvImport from "../../../components/NewMonth/NewMonthImport/CsvImport/CsvImport";
import NewMonthStepper from "../../../components/NewMonth/NewMonthStepper/NewMonthStepper";
import { NEW_MONTH_REVIEW_PATH } from "../review";
import { useAppDispatch } from "../../../store/hooks";
import { NextPage } from "next";
import MainLayout from "../../../layouts/MainLayout";

export const NEW_MONTH_IMPORT_PATH = "/new-month/import";

const NewMonthImportPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const data = useSelector(getCsvData);
  const selectionValues = useSelector(getColumnLabels);
  const { enqueueSnackbar } = useSnackbar();

  const handleButtonClick = () => {
    const isColumnCorrectlySelected =
      selectionValues.filter((value) => value == BudgetItemField.DATE).length !=
        1 ||
      selectionValues.filter((value) => value == BudgetItemField.TITLE)
        .length != 1 ||
      selectionValues.filter((value) => value == BudgetItemField.AMOUNT)
        .length != 1;

    if (isColumnCorrectlySelected) {
      enqueueSnackbar(
        "Make sure that each label is assigned to one and only one column",
        {
          variant: "error",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        }
      );
    }

    const amountValue =
      data![0].data[selectionValues.indexOf(BudgetItemField.AMOUNT)];
    const isAmountFormatNotCorrect = isNaN(Number.parseFloat(amountValue));

    if (isAmountFormatNotCorrect) {
      enqueueSnackbar("Make sure amount column has a number value", {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    }

    if (!isColumnCorrectlySelected || !isAmountFormatNotCorrect) {
      dispatch(convertToBudgetItems());
      router.push(NEW_MONTH_REVIEW_PATH);
    }
  };

  return (
    <MainLayout>
      <NewMonthStepper step={0} />
      <CsvImport />
      {data && <CsvTable />}
      {data && (
        <Button
          variant={"contained"}
          size={"large"}
          fullWidth
          sx={{ marginTop: 5 }}
          onClick={handleButtonClick}
        >
          Add +
        </Button>
      )}
    </MainLayout>
  );
};

export default NewMonthImportPage;
