import React, {useContext} from 'react';
import {ThemeContext} from "../contexts/ThemeContext";


const ThemeToggle = (props) => {
  const {toggleTheme} = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>Toggle the theme</button>
  );
};

export default ThemeToggle;

// CLASS
// class ThemeToggle extends Component {
//   static contextType = ThemeContext;
//   render() {
//     const {toggleTheme} = this.context;
//
//     return (
//       <button onClick={toggleTheme}>Toggle the theme</button>
//     );
//   }
// };
//
// export default ThemeToggle;