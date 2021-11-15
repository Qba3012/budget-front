import { FC } from "react";
import { RadialChart } from "react-vis";
import {
  CategorySortedBudget,
  checkTypeOrCategorySortedBudget,
  TypeSortedBudget,
} from "../../model/BudgetInterface";
import { PRIMARY_COLORS } from "../../utils/Constants";

type Props = {
  data: TypeSortedBudget[] | CategorySortedBudget[];
  selection?: string;
  mini?: boolean;
};

class ChartData {
  angle: number;
  label: string;
  subLabel: string;
  radius: number;

  constructor(
    item: TypeSortedBudget | CategorySortedBudget,
    totalSum: number,
    selection: string | undefined
  ) {
    this.angle = item.sum / totalSum;
    this.label = checkTypeOrCategorySortedBudget(item)
      ? item.type.toUpperCase()
      : item.category.toUpperCase();
    this.subLabel = `${Math.round(this.angle * 100)}%`;
    this.radius =
      (selection && selection.toUpperCase()) === this.label ? 1.5 : 1;
  }
}

const CustomRadialChart: FC<Props> = ({ data, selection, mini }) => {
  const getChartData = () => {
    if (!data || data.length <= 0) {
      return [];
    }
    const sum = data
      .map((item) => item.sum)
      .reduce((sum, current) => sum + current);
    return data.map((item) => new ChartData(item, sum, selection));
  };

  return (
    <RadialChart
      data={getChartData()}
      colorRange={PRIMARY_COLORS}
      innerRadius={mini ? 0 : 70}
      radius={mini ? 70 : 100}
      showLabels={true}
      padAngle={mini ? 0 : 0.1}
      height={mini ? 150 : 250}
      width={mini ? 150 : 250}
      animation={"gentle"}
    />
  );
};

CustomRadialChart.defaultProps = {
  mini: false,
};

export default CustomRadialChart;
