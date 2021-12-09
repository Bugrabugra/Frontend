import React, {useContext} from 'react';
import {ThemeContext} from "../contexts/ThemeContext";
import {AuthContext} from "../contexts/AuthContext";


const Navbar = (props) => {
  const {isAuthenticated, toggleAuth} = useContext(AuthContext);
  const {isLightTheme, light, dark} = useContext(ThemeContext);

  const theme = isLightTheme ? light : dark;

  return (
    <nav style={{background: theme.ui, color: theme.syntax}}>
      <h1>Context App</h1>
      <div onClick={toggleAuth}>
        {isAuthenticated ? "Logged in" : "Logged out"}
      </div>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;

// CLASS
// class Navbar extends Component {
//   render() {
//     return (
//       <AuthContext.Consumer>{(authContext) => (
//           <ThemeContext.Consumer>{(themeContext) => {
//             const {isAuthenticated, toggleAuth} = authContext;
//             const {isLightTheme, light, dark} = themeContext;
//             const theme = isLightTheme ? light : dark;
//
//             return (
//               <nav style={{background: theme.ui, color: theme.syntax}}>
//                 <h1>Context App</h1>
//                 <div onClick={toggleAuth}>
//                   {isAuthenticated ? "Logged in" : "Logged out"}
//                 </div>
//                 <ul>
//                   <li>Home</li>
//                   <li>About</li>
//                   <li>Contact</li>
//                 </ul>
//               </nav>
//             )
//           }}
//           </ThemeContext.Consumer>
//         )
//       }
//       </AuthContext.Consumer>
//     );
//   }
// }
//
// export default Navbar;
