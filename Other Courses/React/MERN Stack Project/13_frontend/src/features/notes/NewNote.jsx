import React from 'react';
import { useGetUsersQuery } from "../users/usersApiSlice.js";
import NewNoteForm from "./NewNoteForm.jsx";
import { PulseLoader } from "react-spinners";


const NewNote = () => {
  useTitle("techNotes: New Note");

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
    })
  })

  if (!users?.length) {
    return <PulseLoader color={"#fff"}/>;
  }

  const content = <NewNoteForm users={users}/>;

  return content
};

export default NewNote;
