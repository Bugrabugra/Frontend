import React, { useContext } from "react";
import { CartContext } from "../CartContext.jsx";
import { getProductData } from "../productsStore.js";
import { Button } from "react-bootstrap";


const CartProduct = ({ id, quantity }) => {
  const { deleteFromCart } = useContext(CartContext);
  const productData = getProductData(id);

  return (
    <>
      <h3>{productData.title}</h3>
      <p>{quantity} total</p>
      <p>${(quantity * productData.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => deleteFromCart(productData.id)}>Remove</Button>
      <hr/>
    </>
  );
};

export default CartProduct;
