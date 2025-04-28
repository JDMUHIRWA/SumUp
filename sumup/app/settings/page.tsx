// app/settings/page.tsx
"use client";

import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Tab from "@/components/tabs-header";

export default function Settings() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="px-4  transition-all duration-500 ease-in-out w-full">
          <Header />

          <div className="mt-4">
            <Tab />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
