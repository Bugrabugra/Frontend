import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice.js";
import EditUserForm from "./EditUserForm.jsx";


const EditUser = () => {
  const { id } = useParams();
  const user = useSelector(state => selectUserById(state, id));
  const content = user ? <EditUserForm user={user}/> : <p>Loading...</p>;

  return content;
};

export default EditUser;
