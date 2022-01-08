import "antd/dist/antd.css";
import './App.css';
import "./App.less";
import AntAlert from "./components/AntAlert";
import AntButton from "./components/AntButton";
import AntDatePicker from "./components/AntDatePicker";
import AntForm from "./components/AntForm";
import AntIcons from "./components/AntIcons";
import AntInput from "./components/AntInput";
import AntProgress from "./components/AntProgress";
import AntSelect from "./components/AntSelect";
import AntSpin from "./components/AntSpin";
import AntTableCRUD from "./components/AntTableCRUD";
import AntTableSearch from "./components/AntTableSearch";
import AntTableSelect from "./components/AntTableSelect";
import AntTheme from "./components/AntTheme";


function App() {
  return (
    <div className="App">
      <div className="App-wrapper">
        {/*------------button--------------*/}
        <AntButton />

        {/*-------------input-------------*/}
        <AntInput />

        {/*--------------select--------------*/}
        <AntSelect />

        {/*----------------form---------------*/}
        <AntForm />

        {/*---------------table-------------*/}
        {/* <AntTable /> */}

        {/*---------------table select------------------*/}
        <AntTableSelect />

        {/*alert*/}
        <AntAlert />

        {/*-------------date picker------------*/}
        <AntDatePicker />

        {/*-------------spin---------------*/}
        <AntSpin />

        {/*-------------progress---------------*/}
        <AntProgress />

        {/*------------------icons-----------------*/}
        <AntIcons />

        {/*crud*/}
        <AntTableCRUD />
        
        {/* table search */}
        <AntTableSearch/>
        
        {/* theme */}
        <AntTheme/>
      </div>
    </div>
  );
}

export default App;
