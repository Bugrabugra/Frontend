import SearchBar from "@/components/search-bar";
import RecipeList from "@/components/recipe-list";
import { Suspense } from "react";

type HomeProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const query = (await searchParams).q as string;

  return (
    <main className="min-h-screen py-12 px-16 max-w-6xl mx-auto bg-white">
      <h1 className="text-4xl text-center font-bold mb-3 text-gray-800">
        Recipe Suggester
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-center">
        Find delicious recipes based on ingredients you have or dishes you are
        craving.
      </p>
      <Suspense>
        <SearchBar />
      </Suspense>
      <Suspense
        key={query}
        fallback={<p className="text-center">Loading recipes...</p>}
      >
        <RecipeList query={query} />
      </Suspense>
    </main>
  );
}
