"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex h-screen bg-[#f1f2f5]">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div
          className={cn(
            "fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden",
            isSidebarOpen ? "block" : "hidden"
          )}
          onClick={toggleSidebar}
        ></div>
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
