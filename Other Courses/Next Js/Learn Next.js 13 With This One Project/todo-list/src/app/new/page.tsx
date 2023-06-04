import Link from "next/link";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

async function createTodo(data: FormData) {
  "use server"
  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || title.length === 0) {
    return new Error("Invalid title type");
  }

  await prisma.todo.create({
    data: {title, complete: false}
  });

  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>

      <form className="flex gap-2 flex-col" action={createTodo}>
        <input type="text" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" name="title" />

        <div className="flex gap-1 justify-end">
          <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Cancel</Link>
          <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Create</button>
        </div>
      </form>
    </>
  )
}
