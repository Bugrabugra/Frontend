import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";

type BackButtonProps = {
  text: string;
  link: string;
};

const BackButton = ({ text, link }: BackButtonProps) => {
  return (
    <Link
      href={link}
      className="mb-5 flex items-center gap-1 font-bold text-gray-500 hover:underline"
    >
      <ArrowLeftCircle size={18} />
      {text}
    </Link>
  );
};

export default BackButton;
