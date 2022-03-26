import { ADD_TO_CART_SAGA, REMOVE_FROM_CART_SAGA } from "../types";


export const addToCartAction = (item, cart) => {
  return {
    type: ADD_TO_CART_SAGA,
    payload: { item, cart }
  };
};


export const removeFromCartAction = (item, cart) => {
  return {
    type: REMOVE_FROM_CART_SAGA,
    payload: { item, cart }
  };
};

