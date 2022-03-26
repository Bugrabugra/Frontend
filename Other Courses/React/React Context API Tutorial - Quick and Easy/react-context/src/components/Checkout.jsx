import React, { useContext } from "react";
import CartContext from "../CartContext";


const Checkout = () => {
  const { items } = useContext(CartContext);

  return (
    <div>
      <h2>Checkout</h2>
      <div className="shopping-bag">
        {items.map((item, index) => (
          <div key={index}>
            <h2>{item.name}</h2>
            <h2>{item.price}</h2>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Checkout;
