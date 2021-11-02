import { FC } from "react";
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import LoginIcon from "@mui/icons-material/LoginOutlined";

type Props = {
  isExpanded: boolean;
  isOpen: boolean;
  onOpenClose: () => void;
  onExpandMenu: () => void;
  onMinimizeMenu: () => void;
};

const MyDrawer: FC<Props> = ({isExpanded, isOpen, onOpenClose, onExpandMenu,onMinimizeMenu}) => {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      PaperProps={{ sx: { borderLeft: "none", zIndex: 1000 } }}
      open={isOpen}
      onMouseEnter={onExpandMenu}
      onMouseLeave={onMinimizeMenu}
    >
      <Toolbar />
      <List>
        <ListItem button key={"Login"}>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <Collapse in={isExpanded} orientation="horizontal">
            <ListItemText primary={"Login"} />
          </Collapse>
        </ListItem>
        <ListItem button key={"Settings"}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Collapse in={isExpanded} orientation="horizontal">
            <ListItemText primary={"Settings"} />
          </Collapse>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MyDrawer;
