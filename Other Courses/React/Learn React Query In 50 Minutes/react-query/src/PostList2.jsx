import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts.js";


const PostList2 = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
  });

  if (postsQuery.status === "loading") {
    return <h1>Loading...</h1>
  }

  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>
  }

  return (
    <div>
      <h1>Post List 2</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default PostList2;
