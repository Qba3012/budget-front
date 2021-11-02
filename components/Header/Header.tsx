import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import { FC, useState } from "react";
import MyDrawer from "../Drawer/MyDrawer";

const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const openCloseDrawer = () => {
    setOpen(!open);
  };

  const expandDrawer = () => {
    setIsExpanded(true);
  };

  const minimizeDrawer = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <AppBar position="fixed" color="inherit" elevation={0} sx={{ zIndex: 1300 }}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <IconButton size="large" color="inherit" edge="start" aria-label="menu" onClick={openCloseDrawer}>
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MyDrawer
        isOpen={open}
        isExpanded={isExpanded}
        onOpenClose={openCloseDrawer}
        onExpandMenu={expandDrawer}
        onMinimizeMenu={minimizeDrawer}
      />
    </>
  );
};

export default Header;
