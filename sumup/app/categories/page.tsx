"use client";
import { GlobalDialog } from "@/components/custom-dialog";
import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  // get current user
  const currentUser = useQuery(api.users.current);
  const user = currentUser ? currentUser._id : undefined;

  // Form state
  const [name, setName] = useState("");

  const data = useQuery(
    api.categories.getCategoriesByUser,
    user ? { userId: user } : "skip"
  );

  const createCategory = useMutation(api.categories.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input values before submitting
    if (!name) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (!currentUser?._id) {
        alert("User not loaded yet.");
        return;
      }

      await createCategory({
        name: name,
        userId: currentUser?._id,
      });

      // Reset form fields after successful submission
      setName("");
      alert("Category created successfully!");
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Error creating category:", error);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="px-4 transition-all duration-500 ease-in-out w-full">
          <Header />
          <div className="flex justify-between mx-auto mt-4">
            <h2 className="text-lg font-medium ">My categories</h2>
            <div className="flex gap-4 mx-4 ">
              <GlobalDialog
                title="Create New Category"
                description="Please provide the details for the new category."
                triggerLabel="New"
                onSubmit={handleSubmit}
                submitLabel="Save Changes"
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Name
                    </label>
                    <Input
                      id="name"
                      className="col-span-3"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </GlobalDialog>
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
