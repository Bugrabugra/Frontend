import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  socialId: string;
  link: string;
}

const Member: React.FC<Props> = ({ id, name, socialId, link }) => (
  <div>
    <Image
      src="https://i.pravatar.cc/300?img=2"
      alt={name}
      width={1366}
      height={1555}
    />
    <div className="text-2xl xl:text-3xl">{name}</div>
    <div className="text-2xl">
      <Link href={link}>
        <a target="_blank">{socialId}</a>
      </Link>
    </div>
  </div>
);

export default Member;
