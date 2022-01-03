import { FC } from "react";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { CSVReader } from "react-papaparse";
import { ParseResult } from "papaparse";
import { useAppDispatch } from "../../../../store/hooks";
import { setData } from "../../../../store/csv-import-slice";

const CsvImport: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleOnDrop = (data: ParseResult<string>[], file?: any) => {
    dispatch(setData(data));
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {};

  const handleOnRemoveFile = (data: null, file?: any) => {
    dispatch(setData(null));
  };

  const config = {
    delimiter: ";",
  };

  return (
    <Card sx={{ marginBottom: 5 }}>
      <CardContent>
        <Typography variant={"h6"} mb={5}>
          Import data (csv)
        </Typography>
        <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          addRemoveButton
          removeButtonColor={theme.palette.error.main}
          onRemoveFile={handleOnRemoveFile}
          config={config}>
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </CardContent>
    </Card>
  );
};
export default CsvImport;
