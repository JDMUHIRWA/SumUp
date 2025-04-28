"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const title = (path: string): string => {
    switch (path) {
      case "/dashboard":
        return `Welcome back, user`;
      case "/payments":
        return "Manage Your Payments";
      case "/budget":
        return "Manage Your Budgets";
      case "/categories":
        return "Manage Your Categories";
      case "/settings":
        return "Make changes to your account";
      default:
        return `Welcome back, User`;
    }
  };

  return (
    <div className="w-full h-20 bg-white border-b-2 border-[#FFAE00] shadow-md z-40">
      <div className="h-full px-4 py-3 flex items-center justify-between ">
        {/* Hamburger Menu Button */}
        <SidebarTrigger className="fixed top-4 p-2 w-10 h-10 bg-[#FAFAFA] text-black rounded shadow-md flex flex-col justify-center items-center gap-1" />

        {/* Page Title */}
        <h1 className="text-xl mx-[50px] font-semibold text-gray-800 ">
          {title(pathname)}
        </h1>
      </div>
    </div>
  );
}
