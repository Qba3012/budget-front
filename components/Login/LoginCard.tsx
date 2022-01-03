import { FC, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const LoginCard: FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    setIsValidated(true);
    if (login != "" && password != "") {
      router.push("/");
    }
  };

  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant={"h5"} mb={5}>
          Login
        </Typography>
        <TextField
          value={login}
          error={isValidated && login == ""}
          type={"text"}
          label={"Login"}
          onChange={(event) => setLogin(event.target.value)}
          sx={{ mb: 5 }}
        />
        <TextField
          value={password}
          type={"password"}
          error={isValidated && password == ""}
          label={"Password"}
          onChange={(event) => setPassword(event.target.value)}
          sx={{ mb: 5 }}
        />
        <Button variant={"contained"} onClick={handleButtonClick}>
          Login
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
