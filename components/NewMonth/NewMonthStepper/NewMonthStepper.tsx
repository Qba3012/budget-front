import { FC, ReactElement } from "react";
import {
  Card,
  CardContent,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { RED_GRADIENT } from "../../../utils/Constants";

type StepperProps = {
  step: number;
};

const steps = [
  "Import CSV data from the bank",
  "Add categories to budget items",
  "Summary",
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: RED_GRADIENT,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: RED_GRADIENT,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.grey[300],
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[300],
  zIndex: 1,
  color: theme.palette.common.white,
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: RED_GRADIENT,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: RED_GRADIENT,
  }),
}));

const ColorlibStepIcon: FC<StepIconProps> = (props: StepIconProps) => {
  const { active, completed, className } = props;

  const icons: { [index: string]: ReactElement } = {
    1: <CloudUploadOutlinedIcon />,
    2: <CategoryOutlinedIcon />,
    3: <AssignmentOutlinedIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

const NewMonthStepper: FC<StepperProps> = ({ step }) => {
  return (
    <Card sx={{ marginBottom: 5 }}>
      <CardContent>
        <Stepper
          activeStep={step}
          alternativeLabel
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </CardContent>
    </Card>
  );
};

export default NewMonthStepper;
