import { FC, useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { CategorySortedBudget } from "../../../model/BudgetInterface";
import { toCapitalCase } from "../../../utils/Utils";

type Props = {
  categorySortedBudget: CategorySortedBudget;
};

const SortedBudgetItems: FC<Props> = ({ categorySortedBudget }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        ml: 4,
        mt: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography sx={{ width: "50%" }}>
          {toCapitalCase(categorySortedBudget?.category)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Typography>{categorySortedBudget.sum.toLocaleString()}</Typography>
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <KeyboardArrowUpOutlinedIcon />
            ) : (
              <KeyboardArrowDownOutlinedIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <Collapse in={isExpanded} appear={false}>
        <Table>
          <TableBody
            sx={{
              backgroundColor: theme.palette.grey["50"],
            }}
          >
            {categorySortedBudget.sublist.map((item, index) => (
              <TableRow
                key={`item-${item.title}-${index}`}
                id={`item-${item.title}`}
              >
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
    </Box>
  );
};

export default SortedBudgetItems;
