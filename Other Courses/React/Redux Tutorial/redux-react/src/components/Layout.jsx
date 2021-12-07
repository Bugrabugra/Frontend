import React from "react"
import {connect, useSelector} from "react-redux"

const Layout = (props) => {
  const user = useSelector(state => state.user.user);
  const userFetched = useSelector(state => state.user.fetched);
  const tweets = useSelector(state => state.tweets.tweets);

  console.log(user, userFetched, tweets)
  return (
    <div>

    </div>
  );
};

export default Layout;