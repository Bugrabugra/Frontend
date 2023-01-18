import React, { useState } from 'react';
import PostList1 from "./PostList1.jsx";
import PostList2 from "./PostList2.jsx";
import Post from "./Post.jsx";
import { CreatePost } from "./CreatePost.jsx";
import { PostListPaginated } from "./PostListPaginated.jsx";
import { PostListInfinite } from "./PostListInfinite.jsx";
import { useQueryClient } from "@tanstack/react-query";
import { getPost } from "./api/posts.js";


const Example02 = () => {
  const [currentPage, setCurrentPage] = useState(<PostList1/>);
  const queryClient = useQueryClient();

  const onHoverPostOneLink = () => {
    queryClient.prefetchQuery({queryKey: ["posts", 1], queryFn: () => getPost(1)})
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostList1/>)}>Post List 1</button>
      <button onClick={() => setCurrentPage(<PostList2/>)}>Post List 2</button>
      <button onMouseEnter={onHoverPostOneLink} onClick={() => setCurrentPage(<Post id={1}/>)}>First Post</button>
      <button onClick={() => setCurrentPage(<CreatePost setCurrentPage={setCurrentPage}/>)}>New Post</button>
      <button onClick={() => setCurrentPage(<PostListPaginated/>)}>Post List Paginated</button>
      <button onClick={() => setCurrentPage(<PostListInfinite/>)}>Post List Infinite</button>
      <br/>
      {currentPage}
    </div>
  );
};

export default Example02;
