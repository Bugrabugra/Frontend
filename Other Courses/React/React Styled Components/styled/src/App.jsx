import './App.css';
import "./styles.css";
import StyledButton, { FancyButton, SubmitButton, DarkButton } from "./components/Button/Button";
import { AnimatedLogo } from "./components/Button/Button.styles";
import logo from "./logo.png";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  dark: {
    primary: "#000",
    text: "#fff"
  },
  light: {
    primary: "#fff",
    text: "#000"
  },
  fontFamily: "Montserrat"
};

const GlobalStyle = createGlobalStyle`
  button {
    font-family: ${(props) => props.theme.fontFamily}
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <div className="App">
        {/*<button>Button</button>*/}
        {/*<img src="" alt=""/>*/}
        <AnimatedLogo src={logo}/>
        <StyledButton type="submit">Styled Button</StyledButton>
        <div>
          <br/>
        </div>
        <StyledButton variant="outline">Styled Button</StyledButton>
        <div>
          <br/>
        </div>
        <FancyButton as="a">Fancy Button</FancyButton>
        <div>
          <br/>
        </div>
        <SubmitButton>Submit</SubmitButton>
        <div>
          <br/>
        </div>
        <DarkButton>Dark Theme</DarkButton>
      </div>
    </ThemeProvider>

  )
}

export default App;
