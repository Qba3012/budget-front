import { Button } from "@mui/material";
import CsvTable from "../../../components/NewMonth/NewMonthImport/CsvTable/CsvTable";
import BudgetItemField from "../../../model/BudgetItemField";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import CsvImport from "../../../components/NewMonth/NewMonthImport/CsvImport/CsvImport";
import NewMonthStepper from "../../../components/NewMonth/NewMonthStepper/NewMonthStepper";
import { NEW_MONTH_REVIEW_PATH } from "../review";
import { useAppSelector } from "../../../store/hooks";
import { NextPage } from "next";
import MainLayout from "../../../layouts/MainLayout";
import { ParseResult } from "papaparse";
import { ERROR_SNACKBAR_CONFIG } from "../../../utils/Constants";
import { getColumnLabels, getCsvData } from "../../../store/csv-import-slice";

export const NEW_MONTH_IMPORT_PATH = "/new-month/import";

const NewMonthImportPage: NextPage = () => {
  const router = useRouter();
  const data = useAppSelector(getCsvData);
  const selectionValues = useAppSelector(getColumnLabels);
  const { enqueueSnackbar } = useSnackbar();

  const validateData = (data: ParseResult<string>[] | null) => {
    const isColumnSelectionError =
      selectionValues.filter((value) => value == BudgetItemField.DATE).length != 1 ||
      selectionValues.filter((value) => value == BudgetItemField.TITLE).length != 1 ||
      selectionValues.filter((value) => value == BudgetItemField.AMOUNT).length != 1;

    if (isColumnSelectionError) {
      enqueueSnackbar("Make sure that each label is assigned to one and only one column", ERROR_SNACKBAR_CONFIG);
    }

    const amountValue = data![0].data[selectionValues.indexOf(BudgetItemField.AMOUNT)];
    const isAmountFormatNotCorrect = isNaN(Number.parseFloat(amountValue));

    if (isAmountFormatNotCorrect) {
      enqueueSnackbar("Make sure amount column has a number value", ERROR_SNACKBAR_CONFIG);
    }
    return !isAmountFormatNotCorrect || !isColumnSelectionError;
  };

  const handleButtonClick = () => {
    if (validateData(data)) {
      router.push(NEW_MONTH_REVIEW_PATH);
    }
  };

  return (
    <MainLayout>
      <NewMonthStepper step={0} />
      <CsvImport />
      {data && <CsvTable />}
      {data && (
        <Button variant={"contained"} size={"large"} fullWidth sx={{ marginTop: 5 }} onClick={handleButtonClick}>
          Next
        </Button>
      )}
    </MainLayout>
  );
};

export default NewMonthImportPage;
