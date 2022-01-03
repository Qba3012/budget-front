import { ElementType, FC } from "react";
import {
  Avatar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NextLink from "next/link";
import { withTheme } from "@mui/styles";
import { useRouter } from "next/router";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { NEW_MONTH_IMPORT_PATH } from "../../pages/new-month/import";
import { HOME_PATH } from "../../pages";
import { HISTORY_PATH } from "../../pages/history";

const MyList = styled(withTheme(List))<{ component?: ElementType }>(
  (props) => ({
    "& .MuiPaper-root.MuiDrawer-paper": {
      width: "200rem",
    },
    "& .MuiListItemButton-root": {
      padding: "1rem 5rem 1rem 2rem",
      color: props.theme.palette.primary.light,
    },
    "& .MuiListItemIcon-root": {
      color: "inherit",
    },
    "& .MuiListItemButton-root: hover": {
      color: "white",
    },
    "& .MuiButtonBase-root.MuiListItemButton-root.Mui-selected": {
      backgroundColor: props.theme.palette.primary.dark,
      color: "white",
    },
  })
);

const MyDrawer: FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const getRootPath = (path: string) => {
    if (path.indexOf("/", 2) < 0) {
      return path;
    }
    return path.substr(0, path.indexOf("/", 2));
  };

  const isSelected = (path: string) => {
    return getRootPath(path) == getRootPath(router.pathname);
  };

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.main,
          width: "16rem",
        },
      }}
      open={true}
    >
      <Avatar
        sx={{
          alignSelf: "center",
          width: "10rem",
          height: "10rem",
          marginTop: `${theme.mixins.toolbar.minHeight}px`,
          marginBottom: 10,
        }}
      >
        <Image src={"/avatar.jpg"} alt="Budget avatar" layout={"fill"} />
      </Avatar>
      <MyList>
        <NextLink href={HOME_PATH}>
          <ListItemButton selected={isSelected(HOME_PATH)} key={"Dashboard"}>
            <ListItemIcon color="primary">
              <HomeOutlinedIcon sx={{ color: "inherit" }} />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ color: "inherit" }}
              primary={"Dashboard"}
            />
          </ListItemButton>
        </NextLink>
        <NextLink href={NEW_MONTH_IMPORT_PATH}>
          <ListItemButton
            selected={isSelected(NEW_MONTH_IMPORT_PATH)}
            key={"New month"}
          >
            <ListItemIcon>
              <LibraryAddOutlinedIcon sx={{ color: "inherit" }} />
            </ListItemIcon>
            <ListItemText
              primary={"New Month"}
              primaryTypographyProps={{ color: "inherit" }}
            />
          </ListItemButton>
        </NextLink>
        <NextLink href={HISTORY_PATH}>
          <ListItemButton selected={isSelected(HISTORY_PATH)} key={"history"}>
            <ListItemIcon>
              <LibraryBooksOutlinedIcon sx={{ color: "inherit" }} />
            </ListItemIcon>
            <ListItemText
              primary={"History"}
              primaryTypographyProps={{ color: "inherit" }}
            />
          </ListItemButton>
        </NextLink>
      </MyList>
    </Drawer>
  );
};

export default MyDrawer;
