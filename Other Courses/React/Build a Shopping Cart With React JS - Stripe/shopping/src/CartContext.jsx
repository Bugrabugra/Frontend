import { createContext, useState } from "react";
import { getProductData } from "./productsStore.js";


export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {}
});

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const getProductQuantity = (id) => {
    const quantity = cartProducts.find((product) => product.id === id)?.quantity;
    return quantity ?? 0;
  };

  const addOneToCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCartProducts([...cartProducts, { id, quantity: 1 }])
    } else {
      setCartProducts(
        cartProducts.map((product) => product.id === id ? { ...product, quantity: product.quantity + 1 } : product)
      );
    }
  };

  const removeOneFromCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) => product.id === id ? { ...product, quantity: product.quantity - 1 } : product)
      )
    }
  };

  const deleteFromCart = (id) => {
    setCartProducts((cartProducts) => cartProducts.filter((product) => product.id !== id));
  };

  const getTotalCost = () => {
    return cartProducts.reduce((acc, product) => {
      const productData = getProductData(product.id);
      acc += productData.price * product.quantity;
      return acc;
    }, 0);
  };

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
};
