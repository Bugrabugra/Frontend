import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Menu } from "@/app/Menu";
import { getFolders } from "@/app/cli/sdk";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Content Garden',
  description: 'My beautiful content garden'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { folders } = await getFolders()
  console.log(folders)

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <nav className="flex items-center gap-x-6 border-t-4 border-t-sky-500 bg-gray-100 p-6 py-4">
          <h1 className="font-semibold tracking-tight text-gray-700">Content Garden</h1>
          <Menu folders={folders} />
        </nav>
        {children}
      </body>
    </html>
  )
}
