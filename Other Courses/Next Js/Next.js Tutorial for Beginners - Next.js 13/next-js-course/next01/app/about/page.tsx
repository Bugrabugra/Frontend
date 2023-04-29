import React from 'react';
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page",
  description: "Created by Dave",
  viewport: "width=device-width, initial-scale=1",
  icons: "/favicon.ico"
}

const About = () => {
  // throw new Error("not today");

  return (
    <>
      <h1>About</h1>
      <Link href="/">Link to Home Page</Link>
    </>
  );
};

export default About;
