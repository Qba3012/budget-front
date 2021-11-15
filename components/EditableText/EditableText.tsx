import { ChangeEvent, FC, useState } from "react";
import {
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  elementId: string;
  editId: string;
  text: string | number;
  isNumeric?: boolean;
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    id: string
  ) => void;
};
const EditableText: FC<Props> = ({
  text,
  onChange,
  elementId,
  editId,
  isNumeric,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);

  const handleClickAway = () => {
    setIsEdited(false);
    setShowEditIcon(false);
  };

  const component = isEdited ? (
    <ClickAwayListener onClickAway={handleClickAway}>
      <TextField
        id={elementId}
        sx={{ width: "100%" }}
        type={isNumeric ? "number" : "text"}
        value={text}
        onChange={(event) => onChange(event, editId)}
      />
    </ClickAwayListener>
  ) : (
    <Box
      sx={{ position: "relative" }}
      onMouseOver={() => setShowEditIcon(true)}
      onMouseLeave={() => setShowEditIcon(false)}
    >
      <Grow in={showEditIcon} appear={false}>
        <IconButton
          onClick={() => setIsEdited(!isEdited)}
          sx={{ position: "absolute", top: -25, left: -25 }}
        >
          <EditIcon fontSize={"small"} />
        </IconButton>
      </Grow>
      <Typography>{text}</Typography>
    </Box>
  );

  return <>{component}</>;
};

export default EditableText;
