import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
      <Toaster />
    </main>
  );
};

export default Layout;
