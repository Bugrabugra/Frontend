import React from 'react';
import { useQueries, useQuery } from "@tanstack/react-query";
import { getPost, getPosts } from "./api/posts.js";


const PostList1 = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    // refetchInterval: 1000
    initialData: [{id: 1, title: "Initial Data"}]
  });

  // const queries = useQueries({
  //   queries: (postsQuery?.data ?? []).map((post) => {
  //     return {
  //       queryKey: ["posts", post.id],
  //       queryFn: () => getPost(post.id)
  //     }
  //   })
  // });

  if (postsQuery.status === "loading") {
    return <h1>Loading...</h1>
  }

  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>
  }

  return (
    <div>
      <h1>Post List 1</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default PostList1;
