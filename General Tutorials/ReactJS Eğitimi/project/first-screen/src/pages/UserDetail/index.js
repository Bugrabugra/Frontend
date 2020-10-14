import React from "react";
import users from "../../data";
import {useParams} from "react-router-dom";


const UserDetail = () => {
  const {id} = useParams();
  const user = users.filter((user) => {
    return user.id === id
  })[0];

  return (
    <>
      <div className="user-detail">
        <b>Name : </b> {user.name} {user.surname} <br/>
        <b>Title : </b> {user.title} <br/>
        <b>Name : </b> {user.city} <br/>
      </div>
    </>
  )
}

export default UserDetail;