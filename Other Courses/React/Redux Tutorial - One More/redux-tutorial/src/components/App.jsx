import {connect} from "react-redux";
import {selectUser} from "../store/actions";


function App(props) {
  return (
    <div>
      <h2>User List:</h2>
      {props.users.map(user => <p key={user.id} onClick={() => props.selectUser(user)}>{user.first}</p>)}
      <hr/>
      <h2>User Details:</h2>
      {props.activeUser && (
        <div>
          <p>{props.activeUser.first}</p>
          <p>{props.activeUser.last}</p>
          <p>{props.activeUser.age}</p>
          <p>{props.activeUser.description}</p>
          <img src={props.activeUser.thumbnail} alt=""/>
        </div>
      )}

    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    activeUser: state.activeUser
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectUser: (user) => dispatch(selectUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
