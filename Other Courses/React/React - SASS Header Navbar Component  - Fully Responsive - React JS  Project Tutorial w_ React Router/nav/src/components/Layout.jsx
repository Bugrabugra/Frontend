import Header from "./Header";
import classes from "./Layout.module.scss";

const Layout = ({children}) => {
  return (
    <div>
      <Header/>
      <div className={classes.container}>
        {children}
      </div>
    </div>
  )
};

export default Layout;