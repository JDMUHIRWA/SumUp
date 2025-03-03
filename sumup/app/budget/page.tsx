// app/budget/page.tsx
"use client";

import { useState } from "react";
import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import BudgetCard from "@/components/budget-card";
import BudgetTabs from "@/components/budget-tabs";
import AddBudgetForm from "@/components/add-budget-form";

export default function Budget() {
  const [activeTab, setActiveTab] = useState("bank");

  // Mock data for budget cards
  const budgetData = {
    overall: {
      budgetLimit: 0,
      currentSpending: 0,
      remainingAmount: 0,
      progress: 0,
    },
    bank: {
      budgetLimit: 500000,
      currentSpending: 0,
      remainingAmount: 500000,
      progress: 0,
    },
    mobile: {
      budgetLimit: 500000,
      currentSpending: 0,
      remainingAmount: 500000,
      progress: 0,
    },
    cash: {
      budgetLimit: 500000,
      currentSpending: 0,
      remainingAmount: 500000,
      progress: 0,
    },
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="px-4 transition-all duration-500 ease-in-out w-full">
          <Header />

          <div className="container mx-auto mt-24">
            {/* Budget Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <BudgetCard title="Overall Budget" {...budgetData.overall} />
              <BudgetCard title="Bank of Kigali" {...budgetData.bank} />
              <BudgetCard title="Mobile Money" {...budgetData.mobile} />
              <BudgetCard title="Cash Account" {...budgetData.cash} />
            </div>

            {/* Tabs for account selection */}
            <div className="mb-8">
              <BudgetTabs activeTab={activeTab} onTabChange={setActiveTab} />
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
