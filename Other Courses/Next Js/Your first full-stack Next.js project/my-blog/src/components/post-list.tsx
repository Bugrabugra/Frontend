import Link from "next/link";
import prisma from "@/lib/db";

export default async function PostList() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const posts = await prisma.post.findMany();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="mb-3">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
