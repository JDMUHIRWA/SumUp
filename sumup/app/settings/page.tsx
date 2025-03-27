// app/budget/page.tsx
"use client";

import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Tab from "@/components/tabs-header";
import { ProfileForm } from "@/components/settings-form";

export default function Budget() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="px-4  transition-all duration-500 ease-in-out w-full">
          <Header />

          <div className="mt-24">
            <Tab />

            <div className=" p-4  w-full">
              <ProfileForm />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
