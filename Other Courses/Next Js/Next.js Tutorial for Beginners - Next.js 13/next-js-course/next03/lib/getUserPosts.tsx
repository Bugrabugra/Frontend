import React from 'react';

const getUserPosts = async (userId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    {next: {revalidate: 60}}
  );

  if (!res.ok) {
    return undefined;
  }

  return res.json();
};

export default getUserPosts;
