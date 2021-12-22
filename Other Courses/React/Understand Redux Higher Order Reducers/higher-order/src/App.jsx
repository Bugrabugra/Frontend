import React from "react";
import { connect } from "react-redux";
import AddArticle from "./store/actions/articleActions";
import AddUser from "./store/actions/userActions";

function App({users, articles, addUser, addArticle}) {
  return (
    <div className="App">
      <div>
        <button onClick={addUser}>Add User</button>
        <ul>
          {users.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>

      <hr />
      <div>
        <button onClick={addArticle}>Add Article</button>
        <ul>
          {articles.map((article) => (
            <li key={article}>{article}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: () => dispatch(AddUser()),
    addArticle: () => dispatch(AddArticle())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
