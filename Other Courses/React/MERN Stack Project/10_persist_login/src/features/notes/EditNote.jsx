import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/usersApiSlice.js";
import { selectNoteById } from "./notesApiSlice.js";
import EditNoteForm from "./EditNoteForm.jsx";


const EditNote = () => {
  const { id } = useParams()
  const note = useSelector(state => selectNoteById(state, id))
  const users = useSelector(selectAllUsers)

  const content = note && users ? <EditNoteForm note={note} users={users}/> : <p>Loading...</p>

  return content
}
export default EditNote;
