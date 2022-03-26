import { Link } from "react-router-dom";
import { AiFillShopping } from "react-icons/all";
import { useContext } from "react";
import CartContext from "../CartContext";


const Nav = () => {
  const { items } = useContext(CartContext);

  return (
    <nav>
      <Link to={"/"}>
        <h1>Wear</h1>
      </Link>
      <Link to={"/checkout"}>
        <div className="cart">
          <AiFillShopping/>
          <span>{items.length}</span>
        </div>
      </Link>
    </nav>
  )
};

export default Nav;
