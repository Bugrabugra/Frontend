import React, { Suspense } from 'react';
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import UserPosts from "@/app/users/[userId]/components/UserPosts";
import { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";
import { notFound } from "next/navigation";

type Params = {
  params: {
    userId: string
  }
};

export const generateMetadata = async ({params: { userId }}: Params): Promise<Metadata> => {
  const userData: Promise<User> = getUser(userId);
  const user = await userData;

  if (!user) {
    return {
      title: "User Not Found"
    }
  }

  return {
    title: user.name,
    description: `This is the page of ${user.name}`
  };
};

const UserPage = async ({params: { userId }}: Params) => {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  // const [user, userPosts] = await Promise.all([userData, userPostsData]);

  const user = await userData;

  if (!user) {
    return notFound();
  }

  return (
    <>
      <h2>{user.name}</h2>
      <br/>
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* @ts-expect-error Server Component */}
        <UserPosts promise={userPostsData}/>
      </Suspense>
    </>
  );
};

export const generateStaticParams = async () => {
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;

  return users.map((user) => {
    return {
      userId: user.id.toString()
    };
  });
}

export default UserPage;
