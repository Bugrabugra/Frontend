import Auth from "./Auth.tsx";
import { Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin.ts";

const Login = () => {
  const { login, error } = useLogin();

  return (
    <Auth
      submitLabel="Log in"
      onSubmit={(request) => login(request)}
      error={error}
    >
      <Link to={"/signup"} style={{ alignSelf: "center" }}>
        <MUILink>Sign up</MUILink>
      </Link>
    </Auth>
  );
};

export default Login;
