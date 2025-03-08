// app/budget/page.tsx
"use client";

import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AddBudgetForm from "@/components/add-budget-form";
import BudgetPage from "@/components/budget-card";

export default function Budget() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="px-4 transition-all duration-500 ease-in-out w-full">
          <Header />

          <div className="container mx-auto mt-24">
            {/* Budget Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <BudgetPage />
            </div>

            {/* Add Budget Form */}
            <div className="max-w-md mx-auto mb-8">
              <AddBudgetForm />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
