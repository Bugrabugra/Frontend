import Auth from "./Auth.tsx";
import { Link } from "react-router-dom";
import { Link as MUILink, TextField } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser.ts";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/error.ts";
import { useLogin } from "../../hooks/useLogin.ts";
import { UNKNOWN_ERROR_MESSAGE } from "../../constants/errors.ts";

const Signup = () => {
  const [createUser] = useCreateUser();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { login } = useLogin();

  return (
    <Auth
      submitLabel="Sign up"
      error={error}
      extraFields={[
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          error={!!error}
          helperText={error}
        />
      ]}
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                username,
                password
              }
            }
          });
          await login({ email, password });
          setError("");
        } catch (error) {
          const errorMessage = extractErrorMessage(error);

          if (errorMessage) {
            setError(errorMessage);
            return;
          }
          setError(UNKNOWN_ERROR_MESSAGE);
        }
      }}
    >
      <Link to={"/login"} style={{ alignSelf: "center" }}>
        <MUILink>Log in</MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;
