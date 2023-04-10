"use client"

import AddPost from "@/app/components/AddPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Posts";

// fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"]
  });

  if (error) {
    return error
  }

  if (isLoading) {
    return "Loading"
  }

  return (
    <main>
      <AddPost />
      {data?.map((post) => (
        <Post
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
          comments={post.comments}
        />
      ))}
    </main>
  )
}
