"use client"

import React from 'react';
import Post from "@/app/components/Post";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "@/app/types/Post";
import AddComment from "@/app/components/AddComment";
import Image from "next/image";

type URL = {
  params: {
    slug: string
  }
}

// fetch all posts
const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`)
  return response.data
}

const PostDetail = (url: URL) => {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug)
  })

  if (isLoading) {
    return "Loading..."
  }

  console.log(data)

  return (
    <div>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        postTitle={data?.title}
        comments={data?.comments}
      />
      <AddComment id={data?.id} />
      {data?.comments?.map((comment) => (
        <>
          <div className="flex items-center gap-2" key={comment.id}>
            <Image
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.title}</div>
        </>
      ))}
    </div>
  );
};

export default PostDetail;
