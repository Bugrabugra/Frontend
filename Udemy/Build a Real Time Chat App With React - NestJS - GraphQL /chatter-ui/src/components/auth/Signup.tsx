import Auth from "./Auth.tsx";
import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";

const Signup = () => {
  return (
    <Auth submitLabel="Sign up" onSubmit={async () => {}}>
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <MUILink>Log in</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
