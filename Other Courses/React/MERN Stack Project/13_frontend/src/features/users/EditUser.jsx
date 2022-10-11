import React from 'react';
import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice.js";
import EditUserForm from "./EditUserForm.jsx";
import { PulseLoader } from "react-spinners";


const EditUser = () => {
  const { id } = useParams();
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    })
  });

  if (!user) {
    return <PulseLoader color={"#fff"}/>;
  }

  const content = <EditUserForm user={user}/>;

  return content;
};

export default EditUser;
