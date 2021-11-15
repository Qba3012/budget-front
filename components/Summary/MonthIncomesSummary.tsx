import { FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import BudgetItem from "../../model/BudgetItem";

type Props = {
  incomes: BudgetItem[];
  totalIncomesValue: number;
};
const MonthIncomesSummary: FC<Props> = ({ incomes, totalIncomesValue }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card sx={{ marginTop: 5 }}>
      <CardContent>
        <Typography variant={"h4"} sx={{ color: theme.palette.secondary.main }}>
          Incomes
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: 8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant={"h6"}>Total</Typography>
            <Typography variant={"h5"}>
              {totalIncomesValue.toLocaleString()}
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 2,
              alignItems: "center",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{ color: theme.palette.grey["600"] }}
              size={"small"}
              onClick={() => setIsExpanded(!isExpanded)}
              endIcon={
                isExpanded ? (
                  <KeyboardArrowUpOutlinedIcon />
                ) : (
                  <KeyboardArrowDownOutlinedIcon />
                )
              }
            >
              More
            </Button>
          </Box>
        </Box>
        <Collapse
          in={isExpanded}
          appear={false}
          sx={{
            marginTop: 2,
          }}
        >
          <Table>
            <TableBody
              sx={{
                backgroundColor: theme.palette.grey["50"],
                marginTop: 5,
              }}
            >
              {incomes.map((item) => (
                <TableRow key={`item-${item.title}`} id={`item-${item.title}`}>
                  <TableCell sx={{ width: "20%" }}>
                    <Typography
                      variant={"body2"}
                      color={theme.palette.grey["600"]}
                    >
                      {item.date}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "10px",
                    }}
                  >
                    <Typography
                      variant={"body2"}
                      color={theme.palette.grey["600"]}
                      sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "20%" }}>
                    <Typography
                      variant={"body2"}
                      color={theme.palette.grey["600"]}
                      textAlign={"end"}
                    >
                      {item.amount}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default MonthIncomesSummary;
