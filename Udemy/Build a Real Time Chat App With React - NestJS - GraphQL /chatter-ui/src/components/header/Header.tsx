import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding.tsx";
import MobileNavigation from "./mobile/MobileNavigation.tsx";
import MobileBranding from "./mobile/MobileBranding.tsx";
import Navigation from "./Navigation.tsx";
import Settings from "./Settings.tsx";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "../../constants/authenticated.ts";
import { Page } from "../../types/page.type.ts";

const pages: Page[] = [
  {
    title: "Home",
    path: "/"
  }
];

const unauthenticatedPages: Page[] = [
  {
    title: "Login",
    path: "/login"
  },
  {
    title: "Signup",
    path: "/signup"
  }
];

function Header() {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <MobileNavigation
            pages={authenticated ? pages : unauthenticatedPages}
          />
          <MobileBranding />
          <Navigation pages={pages} />
          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
