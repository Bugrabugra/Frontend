import React, { useContext } from "react";
import { AiFillShopping, IoShirtOutline } from "react-icons/all";
import CartContext from "../CartContext";


const Card = ({ name, price }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div onClick={() => addToCart(name, price)} className="card">
      <div className="product-box">
        <IoShirtOutline/>
      </div>
      <div className="purchase">
        <h3>{name}</h3>
        <AiFillShopping/>
      </div>
      <h4>${price}</h4>
    </div>
  )
};

export default Card;
