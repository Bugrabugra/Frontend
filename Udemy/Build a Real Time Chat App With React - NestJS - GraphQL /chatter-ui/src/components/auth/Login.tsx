import Auth from "./Auth.tsx";
import { Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Auth submitLabel="Log in" onSubmit={async () => {}}>
      <Link to={"/signup"} style={{ alignSelf: "center" }}>
        <MUILink>Sign up</MUILink>
      </Link>
    </Auth>
  );
};

export default Login;
