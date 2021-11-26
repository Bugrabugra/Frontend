import {actionsUI} from "./ui-slice";
import axios from "axios";
import {actionsCart} from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get("https://react-course-ba29d-default-rtdb.europe-west1.firebasedatabase.app/cart.json");

      if (response.statusText !== "OK") {
        throw new Error("Could not fetch cart data!");
      }
      const data = await response.data;
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(actionsCart.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity
      }));
    } catch(error) {
      dispatch(actionsUI.showNotification({
        status: "error",
        title: "Error!",
        message: error.message
      }));
    }
  }
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(actionsUI.showNotification({
      status: "pending",
      title: "Sending...",
      message: "Sending cart data!"
    }));

    const sendRequest = async () => {
      const response = await axios.put(
        "https://react-course-ba29d-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          items: cart.items,
          totalQuantity: cart.totalQuantity
        }
      );

      if (response.statusText !== "OK") {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(actionsUI.showNotification({
        status: "success",
        title: "Success!",
        message: "Sent cart data successfully!"
      }));
    } catch(error) {
      dispatch(actionsUI.showNotification({
        status: "error",
        title: "Error!",
        message: error.message
      }));
    }
  }
};