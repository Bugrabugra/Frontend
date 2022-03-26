import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, removeFromCartAction } from "./redux/actions/cartActions";
import { setAlertAction } from "./redux/actions/alertActions";
import { findCustomer, findEmployee } from "./redux/actions/userActions";


const Shop = () => {
  const {cart, cartTotal} = useSelector(state => state.cartReducer);
  const {alert} = useSelector(state => state.alertReducer);
  const {employee, customer} = useSelector(state => state.userReducer);
  const {first} = employee.name;
  const customerFirst = customer.name.first;
  const dispatch = useDispatch();

  const items = [
    {id: 1, name: "overwatch", price: 20},
    {id: 2, name: "minecraft", price: 32},
    {id: 3, name: "fortnite", price: 51}
  ];

  const addToCart = (el) => {
    let addIt = true;
    for (const item of cart) {
      if (item.id === el.id) {
        addIt = false;
      }
    }
    if (addIt) {
      dispatch(addToCartAction(el, cart));
      dispatch(setAlertAction(""));
    } else {
      dispatch(setAlertAction(`${el.name} is already in your cart`));
    }

  };

  const removeFromCart = (el) => {
    dispatch(removeFromCartAction(el, cart));
    dispatch(setAlertAction(""));
  };

  const callForEmployee = () => {
    dispatch(findEmployee());
  };

  const callForCustomer = () => {
    dispatch(findCustomer());
  };

  const listItems = items.map((el) => (<div key={el.id}>
    {`${el.name}: $${el.price}`}
    <input type="submit" value="add" onClick={() => addToCart(el)}/>
  </div>));

  const cartItems = cart.map((el) => (<div key={el.id}>
    {`${el.name}: $${el.price}`}
    <input type="submit" value="remove" onClick={() => removeFromCart(el)}/>
  </div>));

  return (
    <div>
      STORE
      <div>
        Employee name: {first} {" "}
        <input type="submit" value="Find Employee" onClick={() => callForEmployee()}/>
      </div>
      <div>{listItems}</div>
      <div>CART</div>
      <div>
        Customer name: {customerFirst} {" "}
        <input type="submit" value="Find Customer" onClick={() => callForCustomer()}/>
      </div>
      <div>{cartItems}</div>
      <div>Total: ${cartTotal}</div>
      <div>Alert Message: {alert}</div>
    </div>
  );
};

export default Shop;
