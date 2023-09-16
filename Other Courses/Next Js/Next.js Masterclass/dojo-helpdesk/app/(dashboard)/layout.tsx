import React, { ReactNode } from "react";
import Navbar from "@/app/components/Navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
