let counter = 0;

const AddUser = () => {
  return {
    type: "ADD_USER",
    payload: `User ${counter++}`
  }
};

export default AddUser;