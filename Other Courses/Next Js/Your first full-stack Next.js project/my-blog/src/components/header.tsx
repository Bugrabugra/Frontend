"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/",
    label: "Home"
  },
  {
    href: "/posts",
    label: "Posts"
  },
  {
    href: "/create-post",
    label: "Create post"
  }
];

export default function Header() {
  const pathName = usePathname();

  return (
    <header className="flex items-center justify-between border-b px-7 py-4">
      <Link href="/">
        <Image
          src="https://bytegrad.com/course-assets/youtube/example-logo.png"
          alt="logo"
          className="w-[35px] h-[35px]"
          width={35}
          height={35}
        />
      </Link>

      <nav>
        <ul className="flex gap-x-5 text-[14px]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className={
                  pathName === link.href ? "text-zinc-900" : "text-zinc-400"
                }
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
