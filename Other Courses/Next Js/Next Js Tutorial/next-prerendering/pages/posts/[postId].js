import React from 'react';
// import { useRouter } from "next/router";


const Post = ({ post }) => {
  // const router = useRouter();

  // if (router.isFallback) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <>
      <h2>{post.id} {post.title}</h2>
      <hr/>
      <p>{post.body}</p>
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  // const paths = data.map((post) => {
  //   return {
  //     params: {
  //       postId: `${post.id}`
  //     }
  //   }
  // })

  return {
    paths: [
      { params: { postId: "1" } },
      { params: { postId: "2" } },
      { params: { postId: "3" } }
    ],
    fallback: "blocking"
  }
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`);
  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true
    }
  }

  console.log(`Generating page for /posts/${params.postId}`)

  return {
    props: {
      post: data
    }
  }
}
