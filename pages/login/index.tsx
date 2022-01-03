import type { NextPage } from "next";
import LoginLayout from "../../layouts/LoginLayout";
import LoginCard from "../../components/Login/LoginCard";

const Login: NextPage = () => {
  return (
    <LoginLayout>
      <LoginCard />
    </LoginLayout>
  );
};

export default Login;
