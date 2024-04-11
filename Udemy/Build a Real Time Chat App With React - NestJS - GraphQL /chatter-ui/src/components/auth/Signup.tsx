import Auth from "./Auth.tsx";
import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser.ts";

const Signup = () => {
  const [createUser] = useCreateUser();

  return (
    <Auth
      submitLabel="Sign up"
      onSubmit={async ({ email, password }) => {
        await createUser({
          variables: {
            createUserInput: {
              email,
              password
            }
          }
        });
      }}
    >
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <MUILink>Log in</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
