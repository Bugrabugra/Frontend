import PostList from "@/components/post-list";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="px-5 pt-32 text-center">
      <h1 className="mb-5 text-4xl font-bold md:text-5xl">All posts</h1>

      <Suspense fallback="Loading...">
        <PostList />
      </Suspense>
    </main>
  );
}
