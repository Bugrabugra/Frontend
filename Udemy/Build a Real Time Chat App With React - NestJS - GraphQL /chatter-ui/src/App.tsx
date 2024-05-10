import { createTheme, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client.ts";
import Guard from "./components/auth/Guard.tsx";
import Header from "./components/header/Header.tsx";
import Snackbar from "./components/snackbar/Snackbar.tsx";
import ChatList from "./components/chat-list/ChatList.tsx";
import { usePath } from "./hooks/usePath.ts";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes.tsx";
import Container from "@mui/material/Container";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

function App() {
  const { path } = usePath();

  const showChatList = path === "/" || path.includes("chats");

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          <Container maxWidth="xl" sx={{ marginTop: "1rem" }}>
            {showChatList ? (
              <Grid container spacing={5}>
                <Grid xs={12} item md={5} lg={4} xl={3}>
                  <ChatList />
                </Grid>
                <Grid xs={12} item md={7} lg={8} xl={9}>
                  <Routes />
                </Grid>
              </Grid>
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>

        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
}

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default App;
