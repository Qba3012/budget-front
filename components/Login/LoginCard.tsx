import { FC, useEffect } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { AUTH_PROVIDER } from "../../utils/Constants";

const LoginCard: FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status == "authenticated";

  useEffect(() => {
    if (isAuthenticated && session) {
      router.push(`/dashboard/${session.user?.name}`);
    }
  }, [isAuthenticated, session, router]);

  const handleButtonClick = () => {
    signIn(AUTH_PROVIDER);
  };

  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ width: "15rem", height: "15rem", position: "relative", alignSelf: "center" }}>
          <Image alt={"background"} src={"/avatar.jpg"} layout="fill" />
        </Box>
        {isAuthenticated && <Typography variant={"subtitle1"}>Loading...</Typography>}
        {!isAuthenticated && (
          <Button variant={"contained"} onClick={handleButtonClick}>
            Login
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default LoginCard;
