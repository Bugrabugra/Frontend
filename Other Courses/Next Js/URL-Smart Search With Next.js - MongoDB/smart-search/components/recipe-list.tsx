import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function RecipeList({ query }: { query: string }) {
  const res = await prisma.$runCommandRaw({
    aggregate: "recipes",
    pipeline: [
      {
        $search: {
          index: "default",
          text: {
            query,
            path: ["title", "description"],
            fuzzy: {
              maxEdits: 2, // allows up to 2 typos
              prefixLength: 1, // first char must catch exactly
            },
          },
        },
      },
      { $limit: 10 },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          score: { $meta: "searchScore" },
        },
      },
    ],
    cursor: {},
  });

  const results = res.cursor.firstBatch;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {results.map((recipe) => (
        <Link
          href={`/recipes/${recipe.title}`}
          key={recipe.title + recipe.description}
          className="bg-white border rounded-xl overflow-hidden transition-all duration-300 transform flex flex-col"
        >
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
          </div>

          <div className="p-5 flex-grow">
            <p className="text-gray-600 mb-4 line-clamp-5">
              {recipe.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
