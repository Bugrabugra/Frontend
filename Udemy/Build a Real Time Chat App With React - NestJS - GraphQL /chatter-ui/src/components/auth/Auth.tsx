import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetMe } from "../../hooks/useGetMe.ts";
import { useNavigate } from "react-router-dom";

type AuthProps = {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
  extraFields?: React.ReactNode[];
  error?: string;
};

const Auth = ({
  onSubmit,
  submitLabel,
  children,
  error,
  extraFields
}: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: 360,
        margin: "0 auto",
        justifyContent: "center"
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={!!error}
        helperText={error}
      />

      {extraFields}

      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={!!error}
        helperText={error}
      />

      <Button variant="contained" onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>

      {children}
    </Stack>
  );
};

export default Auth;
