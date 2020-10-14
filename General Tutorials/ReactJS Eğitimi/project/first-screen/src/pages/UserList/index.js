import React from "react";
import users from "../../data";
import {useHistory} from "react-router-dom";


const UserList = () => {
  let history = useHistory();

  return (
    <>
      <aside>
        <ul>
          {users.map((user) =>
            <li key={user.id}>
              <button onClick={() => history.push(`user-detail/${user.id}`)}>
                {user.name} {user.surname}
              </button>
            </li>
          )}
        </ul>
      </aside>
    </>
  )
}

export default UserList;