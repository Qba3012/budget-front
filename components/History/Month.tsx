import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC } from "react";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import { useRouter } from "next/router";
import { HISTORY_PATH } from "../../pages/history";
import { MonthApiResponse } from "../../model/api/MonthApiResponse";

type Props = {
  monthLabel: number;
  yearLabel: number;
  monthData: MonthApiResponse | undefined;
};

const CardContentWrapper: FC<{ isAvailable: boolean }> = ({
  isAvailable,
  children,
}) => {
  return (
    <>{isAvailable ? <CardActionArea>{children}</CardActionArea> : children}</>
  );
};

const CustomCardContent = styled(CardContent)(({ theme }) => ({
  ["&.MuiCardContent-root:last-child"]: {
    paddingBottom: theme.spacing(4),
  },
}));

const Month: FC<Props> = ({ monthLabel, yearLabel, monthData }) => {
  const { palette } = useTheme();
  const router = useRouter();
  const isAvailable = monthData?.month == monthLabel;

  const getMonthLabel = () => {
    const date = new Date();
    date.setFullYear(yearLabel, monthLabel - 1);
    return date.toLocaleDateString("en-EN", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card
      sx={{ height: "100%" }}
      onClick={() =>
        isAvailable && router.push(`${HISTORY_PATH}/${monthData?.slug}`)
      }
    >
      <CardContentWrapper isAvailable={isAvailable}>
        <CustomCardContent>
          <Grid container justifyContent="space-between">
            <Typography
              variant="h5"
              color={isAvailable ? palette.common.black : palette.grey["400"]}
            >
              {getMonthLabel()}
            </Typography>
            {isAvailable ? (
              <EventAvailableOutlinedIcon
                fontSize="large"
                sx={{ color: palette.secondary.main }}
              />
            ) : (
              <EventBusyOutlinedIcon
                fontSize="large"
                sx={{ color: palette.warning.light }}
              />
            )}
          </Grid>
          <Button
            variant="outlined"
            color={"inherit"}
            size="small"
            disabled={!isAvailable}
            sx={{
              mt: 3,
              color: palette.secondary.main,
              borderColor: palette.secondary.main,
            }}
          >
            {isAvailable ? "Available" : "No data"}
          </Button>
        </CustomCardContent>
      </CardContentWrapper>
    </Card>
  );
};

export default Month;
