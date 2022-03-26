import { FIND_EMPLOYEE, FIND_CUSTOMER } from "../types";


const url = "https://randomuser.me/api/";
const setHeaders = {headers: {"Content-Type": "application/user"}};

export const findEmployee = () => async dispatch => {
  const res = await fetch(url, setHeaders);
  const data = await res.json();
  const employee = data.results[0];
  console.log(employee)
  dispatch({type: FIND_EMPLOYEE, payload: employee});
};

export const findCustomer = () => async dispatch => {
  const res = await fetch(url, setHeaders);
  const data = await res.json();
  const customer = data.results[0];
  console.log(customer)
  dispatch({type: FIND_CUSTOMER, payload: customer});
};
