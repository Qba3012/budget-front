import type { NextPage } from "next";
import Image from "next/image";
import LoginLayout from "../../layouts/LoginLayout";
import { Box, Grid } from "@mui/material";
import LoginCard from "../../components/Login/LoginCard";

const Login: NextPage = () => {
  return (
    <LoginLayout>
      <Grid
        container
        sx={{ position: "relative", width: "100%", height: "100%" }}
      >
        <Grid item sx={{ flexGrow: 3, height: "100%" }}>
          <Box sx={{ height: "100%", position: "relative" }}>
            <Image
              alt={"background"}
              src={"/avatar.jpg"}
              layout="fill"
              width={"100"}
              height={"100"}
            />
          </Box>
        </Grid>
        <Grid
          item
          flexGrow={1}
          direction={"column"}
          justifyContent="center"
          alignItems="center"
          m={"2rem"}
          sx={{ display: "flex" }}
        >
          <LoginCard />
        </Grid>
      </Grid>
    </LoginLayout>
  );
};

export default Login;
