import React, { Suspense } from 'react';
import Repo from "@/app/components/Repo";
import Link from "next/link";
import RepoDirs from "@/app/components/RepoDirs";


const RepoPage = ({params: {name}}) => {
  return (
    <div className="card">
      <Link href="/code/repos" className="btn btn-back">Back to Repositories</Link>
      <Suspense fallback={<div>Loading repo...</div>}>
        <Repo name={name}/>
      </Suspense>

      <Suspense fallback={<div>Loading directories...</div>}>
        <RepoDirs name={name}/>
      </Suspense>
    </div>
  );
};

export default RepoPage;
