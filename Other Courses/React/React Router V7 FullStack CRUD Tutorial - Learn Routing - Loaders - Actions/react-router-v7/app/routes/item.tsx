import React from "react";
import type { Route } from "./+types/item";
import { supabase } from "~/supabase-client";
import { type ActionFunctionArgs, Form, redirect } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  if (!id) {
    return { error: "No item found" };
  }

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", Number(id));

  if (error) {
    return { error: error.message };
  }

  return { item: data[0] };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const intent = formData.get("intent") as string;

  if (intent === "delete") {
    const { error } = await supabase
      .from("items")
      .delete()
      .eq("id", Number(params.id));

    if (error) {
      return { error: error.message };
    }
    return redirect("/");
  } else {
    const { error } = await supabase
      .from("items")
      .update({
        title,
        description,
      })
      .eq("id", Number(params.id));

    if (error) {
      return { error: error.message };
    }
    return { updated: true };
  }
}

const Item = ({ loaderData, actionData }: Route.ComponentProps) => {
  const { item, error } = loaderData;

  return (
    <div>
      <h2>Edit Item</h2>
      {actionData?.updated && (
        <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
          Item updated successfully
        </div>
      )}
      {actionData?.error && (
        <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
          {actionData.error}
        </div>
      )}
      <Form method="post" className="space-y-4 bg-gray-900 p-4 rounded shadow">
        <div>
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={item?.title}
            placeholder="Title"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={item?.description}
            placeholder="Description"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          name="intent"
          value="update"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          Update Item
        </button>
        <button
          type="submit"
          name="intent"
          value="delete"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          Delete Item
        </button>
      </Form>
    </div>
  );
};

export default Item;
