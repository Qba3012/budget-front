import { AppBar, Button, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useRouter } from "next/router";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { signOut } from "next-auth/react";

const Header: FC = () => {
  const router = useRouter();
  const theme = useTheme();

  const renderTitle = () => {
    switch (true) {
      case router.pathname.includes("/new-month"):
        return "New month";
      case router.pathname.includes("/history"):
        return "History";
      default:
        return "Dashboard";
    }
  };

  return (
    <AppBar position="relative" color="transparent" elevation={0} sx={{ padding: "1rem 0" }}>
      <Toolbar sx={{ justifyContent: "flex-end", paddingLeft: 0, paddingRight: 0 }}>
        <Typography variant="h4" sx={{ flexGrow: 1, color: theme.palette.common.black }}>
          {renderTitle()}
        </Typography>
        <IconButton sx={{ marginRight: "1.5rem" }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <Button
          variant="outlined"
          color={"primary"}
          startIcon={<LogoutOutlinedIcon />}
          onClick={() => signOut({ callbackUrl: `${window.location.origin}` })}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
