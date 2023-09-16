import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="text-center">
      <h2 className="text-3xl">There was a problem</h2>
      <p>We could not find the page you are looking for.</p>
      <p>Go back to the <Link href="/">Dashboard</Link></p>
    </main>
  );
};

export default NotFound;
