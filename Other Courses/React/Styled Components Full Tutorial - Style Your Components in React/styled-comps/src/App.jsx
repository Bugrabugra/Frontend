import { StyledButton } from "./components/Button.style";
import { AppContainer } from "./components/Container.style";
import { GlobalStyles } from "./GlobalStyles.styles";


const App = () => {

  return (
    <AppContainer>
      <GlobalStyles/>
      <StyledButton buttonLabel="Click here" backgroundColor="violet"></StyledButton>
    </AppContainer>
  )
};

export default App
