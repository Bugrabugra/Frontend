import './App.css';
import { createContext, FC } from "react";
import Person, { HairColor } from "./components/Person";


interface AppContextInterface {
  name: string;
  age: number;
  country: string
  isMarried: boolean
}

export const AppContext = createContext<AppContextInterface | null>(null);

const App: FC = () => {
  const contextValue: AppContextInterface = {
    name: "Pedro",
    age: 20,
    country: "Brazil",
    isMarried: false
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <Person name="Pedro" age={20} email="b@g.com" hairColor={HairColor.Brown}/>
      </div>
    </AppContext.Provider>

  )
}

export default App
