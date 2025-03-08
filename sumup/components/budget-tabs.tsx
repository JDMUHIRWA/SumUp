// components/budget-tabs.tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BudgetTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function BudgetTabs({}: BudgetTabsProps) {
  return (
    <>
      <Tabs defaultValue="bk" className="w-[595px]">
        <TabsList className="bg-gray-200 w-full flex justify-start h-[35px] gap-4">
          <TabsTrigger
            value="overall"
            className="data-[state=active]:bg-[#FFC23D] data-[state=active]:text-black data-[state=active]:font-nomral w-1/3"
          >
            Overall
          </TabsTrigger>
          <TabsTrigger
            value="bk"
            className="data-[state=active]:bg-[#FFC23D] data-[state=active]:text-black data-[state=active]:font-nomral w-1/3"
          >
            Bank of Kigali
          </TabsTrigger>
          <TabsTrigger
            value="momo"
            className="data-[state=active]:bg-[#FFC23D] data-[state=active]:text-black data-[state=active]:font-nomral w-1/3"
          >
            Mobile Money
          </TabsTrigger>
          <TabsTrigger
            value="cash"
            className="data-[state=active]:bg-[#FFC23D] data-[state=active]:text-black data-[state=active]:font-normal w-1/3"
          >
            Cash Account
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
