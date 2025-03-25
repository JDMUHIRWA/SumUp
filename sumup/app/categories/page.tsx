"use client";
import Buttons from "@/components/buttons";
import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  // get current user
  const currentUser = useQuery(api.users.current);
  const user = currentUser ? currentUser._id : undefined;

  const data = useQuery(
    api.categories.getCategoriesByUser,
    user ? { userId: user } : "skip"
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="px-4 transition-all duration-500 ease-in-out w-full">
          <Header />
          <div className="flex justify-between mx-auto mt-28">
            <h2 className="text-lg font-medium ">My categories</h2>
            <div className="flex gap-4 mx-4">
              <Buttons />
            </div>
          </div>
          <div className="mt-6">
            <DataTable columns={columns} data={data || []} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
