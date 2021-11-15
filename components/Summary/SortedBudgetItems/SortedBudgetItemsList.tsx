import { FC } from "react";
import SortedBudgetItems from "./SortedBudgetItems";
import { Box } from "@mui/material";
import { TypeSortedBudget } from "../../../model/BudgetInterface";
import CustomRadialChart from "../../Charts/CustomRadialChart";

type Props = {
  typeSortedBudget: TypeSortedBudget;
};

const SortedBudgetItemsList: FC<Props> = ({ typeSortedBudget }) => {
  return (
    <Box sx={{ display: "flex", mt: 2, mb: 2 }}>
      <Box sx={{ width: "50%" }}>
        {typeSortedBudget?.list.map((element) => (
          <SortedBudgetItems
            key={element.category}
            categorySortedBudget={element}
          />
        ))}
      </Box>
      <Box
        sx={{
          width: "50%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <CustomRadialChart data={typeSortedBudget.list} mini={true} />
      </Box>
    </Box>
  );
};

export default SortedBudgetItemsList;
