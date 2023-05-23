import Link from "next/link";

const todos: string[] = ["Learn React"]

export default function Home() {
  return (
    <main className="p-5">
      <div>
        <Link href="/formPost">Simple Form Post</Link>
      </div>

      <div>
        <Link href="/formPostWithStatus">Form Post with Status</Link>
      </div>

      <div>
        <Link href="/formPostWithTransition">Form Post with Transition</Link>
      </div>

      <div>
        <Link href="/pokemonSearch">Pokemon Search</Link>
      </div>
    </main>
  )
}
