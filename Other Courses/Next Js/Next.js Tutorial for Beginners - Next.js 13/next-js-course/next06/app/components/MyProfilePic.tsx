import React from 'react';
import Image from "next/image";

const MyProfilePic = () => {
  return (
    <section className="w-full mx-auto">
      <Image
        className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
        src="/images/bugra.jpeg"
        alt="my-photo"
        height={200}
        width={200}
        priority
      />
    </section>
  );
};

export default MyProfilePic;
