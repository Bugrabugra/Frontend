import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-700 mb-6">
        Full Stack Playwright Demo
      </h1>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link href="/users">
              <span className="text-blue-600 hover:underline">Users</span>
            </Link>
          </li>
          <li>
            <Link href="/posts">
              <span className="text-blue-600 hover:underline">Posts</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
