import React from "react";
import { type ActionFunctionArgs, Form, redirect } from "react-router";
import { supabase } from "~/supabase-client";

export function meta() {
  return [
    { title: "New Item | RRv7 CRUD" },
    {
      name: "description",
      content: "Create a new item" + " using our Supabase app",
    },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) {
    return { error: "Title and content are required" };
  }

  const { error } = await supabase.from("items").insert({ title, description });

  if (error) {
    return { error: error.message };
  }

  return redirect("/");
}

const NewItem = () => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Item</h2>
      <Form method="post" className="space-y-4 bg-gray-900 p-4 rounded shadow">
        <div>
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          Create Item
        </button>
      </Form>
    </div>
  );
};

export default NewItem;
