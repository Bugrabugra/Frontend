import React from 'react';
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice.js";
import NewNoteForm from "./NewNoteForm.jsx";


const NewNote = () => {
  const users = useSelector(selectAllUsers);
  const content = users ? <NewNoteForm users={users}/> : <p>Loading...</p>;

  return content;
};

export default NewNote;
