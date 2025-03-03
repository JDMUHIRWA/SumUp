// components/budget-tabs.tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BudgetTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function BudgetTabs({
  activeTab,
  onTabChange,
}: BudgetTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="w-full grid grid-cols-3 rounded-md">
        <TabsTrigger
          value="bank"
          className={`rounded-md py-2 ${activeTab === "bank" ? "bg-amber-400 text-black" : ""}`}
        >
          Bank of Kigali
        </TabsTrigger>
        <TabsTrigger
          value="mobile"
          className={`rounded-md py-2 ${activeTab === "mobile" ? "bg-amber-400 text-black" : ""}`}
        >
          Mobile Money
        </TabsTrigger>
        <TabsTrigger
          value="cash"
          className={`rounded-md py-2 ${activeTab === "cash" ? "bg-amber-400 text-black" : ""}`}
        >
          Cash Account
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
