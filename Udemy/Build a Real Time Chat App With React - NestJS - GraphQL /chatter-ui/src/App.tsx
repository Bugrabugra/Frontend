import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client.ts";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          <RouterProvider router={router} />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
