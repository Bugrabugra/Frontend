import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./dojo-logo.png";
import { User } from "@supabase/gotrue-js";
import LogoutButton from "@/app/components/LogoutButton";

type NavbarProps = {
  user: User | undefined
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav>
      <Image src={Logo} alt="Dojo Helpdesk logo" width={70} quality={100} placeholder="blur" />
      <h1>Dojo Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className="mr-auto">Tickets</Link>
      {user && <span>Hello, {user.email}</span>}
      <LogoutButton />
    </nav>
  );
};

export default Navbar;
