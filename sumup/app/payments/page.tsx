"use client";

import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Tab from "@/components/tabs";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import TransactionDialog from "@/components/transaction-dialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function Payments() {
  const currentUser = useQuery(api.users.current);
  const userId: Id<"users"> | undefined = currentUser?._id;

  const data = useQuery(
    api.transactions.getTransactionsByUser,
    userId ? { userId } : "skip"
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="px-4 transition-all duration-500 ease-in-out w-full">
          <Header />
          <div className="mx-auto relative">
            {/* <div className="">
              <Tab />
            </div> */}
            <DataTable columns={columns} data={data ?? []} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
