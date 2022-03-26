import React from "react";
import Shop from "./Shop";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Shop/>
      </div>
    </Provider>
  );
};

export default App;
