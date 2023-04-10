"use client"

import React from 'react';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthPosts } from "@/app/types/AuthPosts";
import EditPost from "@/app/dashboard/EditPost";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts")
  return response.data
}

const MyPosts = () => {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"]
  })

  if (isLoading) {
    return <h1>Posts are loading...</h1>
  }

  console.log(data)

  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPost
          key={post.id}
          id={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

export default MyPosts;
