import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getPosts, getUsers } from "./utils/api.ts";
import { PostsResponseHttpData, UserResponseHttpData } from "./utils/types.ts";
import { useState } from "react";

function App() {
  const {
    data: usersData,
    error: usersError,
    isLoading: isUsersLoading,
  } = useQuery<UserResponseHttpData[]>({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });

  const {
    data: postsData,
    // error: postsError,
    isLoading: isPostsLoading,
    // refetch: refetchGetPosts,
  } = useQuery<PostsResponseHttpData[]>({
    queryKey: ["getPosts"],
    queryFn: getPosts,
  });

  const {
    mutate: createPostMutation,
    // isSuccess: isCreatePostSuccess,
    // isPending: isCreatePostPending,
  } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (isCreatePostSuccess && !isCreatePostPending) {
  //     queryClient.invalidateQueries({ queryKey: ["getPosts"] });
  //     queryClient.invalidateQueries({ queryKey: ["getUsers"] });
  //   }
  // }, [isCreatePostSuccess, isCreatePostPending]);

  if (usersError && !isUsersLoading) {
    return <div>An error has occurred while fetching Users...</div>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPostMutation({
            title,
            body,
            userId: 123,
          });
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="body">Body</label>
        <input
          type="body"
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button>Create Post</button>
      </form>

      {!isPostsLoading && postsData ? (
        <div>
          {postsData.map((post) => (
            <div key={post.id}>
              <b>{post.title}</b>
              <b>{post.body}</b>
            </div>
          ))}
        </div>
      ) : (
        <>Loading</>
      )}

      {!isUsersLoading && usersData ? (
        <div>
          {usersData.map((user) => (
            <div key={user.id}>
              <b>{user.name}</b>
              <b>{user.username}</b>
              <b>{user.email}</b>
            </div>
          ))}
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default App;
