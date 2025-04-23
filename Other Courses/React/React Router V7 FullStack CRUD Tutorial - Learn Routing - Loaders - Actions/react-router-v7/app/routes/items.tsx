import React from "react";
import { supabase } from "~/supabase-client";
import type { Route } from "./+types/items";
import { Link } from "react-router";

export async function loader() {
  console.log("Loading...");
  const { data, error } = await supabase.from("items").select("*");

  if (error) {
    return { error: error.message };
  }

  return { items: data };
}

const Items = ({ loaderData }: Route.ComponentProps) => {
  const { items, error } = loaderData;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">List of Items</h2>
      {error && (
        <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">{error}</div>
      )}

      <ul className="space-y-4">
        {items?.map((item) => (
          <li key={item.id} className="p-4 bg-white rounded shadow">
            <Link to={`/items/${item.id}`} className="block text-indigo-600">
              <span className="font-semibold text-xl">{item.title}</span>
              <p className="text-gray-700">{item.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
