import { ReactNode } from "react";

export default function Container({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="mx-auto flex min-h-screen flex-col border-r border-l bg-white max-w-[1100px]">
      {children}
    </div>
  );
}
