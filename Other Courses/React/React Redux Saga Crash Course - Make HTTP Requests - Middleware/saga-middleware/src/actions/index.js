export const petIncrement = (number) => {
  return {
    type: "PET_INCREASED",
    payload: number
  }
};

export const petDecrement = () => {
  return {
    type: "PET_INCREASED"
  }
};

export const getUsers = () => {
  return {
    type: "GET_USERS_REQUESTED"
  }
}
