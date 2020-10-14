const initState = {
  posts: [
    {id: "1", title: "Squirtle", body: "Lorem ipsum"},
    {id: "2", title: "Charmender", body: "Lorem ipsum"},
    {id: "3", title: "Helix", body: "Lorem ipsum"}
  ]
}

const rootReducer = (state = initState, action) => {
  if (action.type === "DELETE_POST") {
    let newPosts = state.posts.filter((post) => {
      return action.id !== post.id;
    })
    return {
      ...state,
      posts: newPosts
    }
  }
  return state;
}

export default rootReducer