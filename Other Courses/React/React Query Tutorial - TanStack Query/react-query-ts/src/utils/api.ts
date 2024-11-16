import { CreatePostRequestBody } from "./types.ts";

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  const res = await fetch(`${BASE_API_URL}/users`);
  return res.json();
};

export const getPosts = async () => {
  const res = await fetch(`${BASE_API_URL}/posts`);
  return res.json();
};

export const createPost = async (body: CreatePostRequestBody) => {
  const res = await fetch(`${BASE_API_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
