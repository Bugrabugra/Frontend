import './globals.css'
import { Poppins } from "next/font/google";
import Header from "@/app/components/Header";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"]
})

export const metadata = {
  title: 'Traversy Media',
  description: 'Web development tutorials and courses',
  keywords: "web development, html, css, js"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header/>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  )
}
