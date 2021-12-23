import { Grid, styled, Tab, Tabs } from "@mui/material";
import React, { FC, useState } from "react";
import Month from "./Month";
import { HistoryApiResponse } from "../../model/api/HistoryApiResponse";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const YearTabs = styled(Tabs)(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.primary.main,
  borderRadius: "5px",
}));

const YearTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  color: "rgba(0, 0, 0, 0.85)",
  "&:hover": {
    color: theme.palette.primary.main,
    opacity: 1,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

type Props = {
  history: HistoryApiResponse[];
};

const Months: FC<Props> = ({ history }) => {
  const [tab, setTab] = useState(0);

  if (history.length == 0) {
    history.push({ year: new Date().getFullYear(), months: [] });
  }

  const createMonths = (historyItem: HistoryApiResponse) => {
    const months = [] as JSX.Element[];
    for (let i = 1; i < 13; i++) {
      months.push(
        <Grid key={i + "-" + historyItem.year} item xs={3}>
          <Month
            monthLabel={i}
            yearLabel={historyItem.year}
            monthData={historyItem.months.find((month) => month.month == i)}
          />
        </Grid>
      );
    }
    return months;
  };

  return (
    <>
      <Grid container justifyContent={"center"}>
        <YearTabs
          value={tab}
          variant="scrollable"
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          onChange={(event, value) => setTab(value)}
        >
          {history.map((historyItem) => (
            <YearTab key={"year"} label={historyItem.year} />
          ))}
        </YearTabs>
      </Grid>
      <Grid container spacing={1} mt={3}>
        {history.map((historyItem) => createMonths(historyItem))[tab]}
      </Grid>
    </>
  );
};

export default Months;
