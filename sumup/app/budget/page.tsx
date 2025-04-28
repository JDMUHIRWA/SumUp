"use client";

import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AddBudgetForm from "@/components/add-budget-form";
import BudgetPage from "@/components/budget-card";
import { GlobalDialog } from "@/components/custom-dialog";

export default function Budget() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="px-4 transition-all duration-500 ease-in-out w-full">
          <Header />

          <div className="container mx-auto mt-4">
            {/* Budget Cards */}
            {/* Add Budget Form inside GlobalDialog */}
            <div className="flex  mb-4">
              <GlobalDialog
                title="Create a New Budget"
                description="Fill in the budget details below."
                triggerLabel="Add New Budget"
                submitLabel="Save Budget"
              >
                <AddBudgetForm />
              </GlobalDialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <BudgetPage />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
