import { OptionsObject } from "notistack";

export const SELECT_PLACEHOLDER = "-";
export const RED_GRADIENT =
  "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)";
export const PRIMARY_COLORS = [
  "#5B7CFD",
  "#33CC86",
  "#FFAE33",
  "#FF7F57",
  "#FFCF27",
  "#FBE691",
];
const LIGHT_COLORS = ["#DEE5FF", "#CDF5F4", "#FFE5DD", "#D8E0FE"];

export const ERROR_SNACKBAR_CONFIG: OptionsObject = {
  variant: "error",
  anchorOrigin: { vertical: "bottom", horizontal: "right" },
};
