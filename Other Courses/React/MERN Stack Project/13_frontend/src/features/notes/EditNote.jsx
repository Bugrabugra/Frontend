import React from 'react';
import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersApiSlice.js";
import { useGetNotesQuery } from "./notesApiSlice.js";
import EditNoteForm from "./EditNoteForm.jsx";
import useAuth from "../../hooks/useAuth.js";
import { PulseLoader } from "react-spinners";


const EditNote = () => {
  const { id } = useParams();
  const { username, isManager, isAdmin } = useAuth();

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id]
    })
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
    })
  });

  if (!note || !users?.length) {
    return <PulseLoader color={"#fff"}/>;
  }

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  const content = <EditNoteForm note={note} users={users}/>;

  return content;
}
export default EditNote;
