import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/general-settings";
import { AccountSettings } from "@/components/account-settings";
import { BudgetSettings } from "@/components/budget-settings";

export default function Tab() {
  return (
    <Tabs defaultValue="general" className="">
      <TabsList className="border-[#e4e4e7] border shadow-sm w-1/2 flex justify-start h-[35px] gap-4">
        <TabsTrigger
          value="general"
          className="w-full data-[state=active]:bg-[#FFC23D]"
        >
          General
        </TabsTrigger>
        <TabsTrigger
          value="account"
          className="w-full data-[state=active]:bg-[#FFC23D]"
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          value="budget"
          className="w-full data-[state=active]:bg-[#FFC23D]"
        >
          Budget
        </TabsTrigger>
      </TabsList>

      {/* Tab Content */}
      <TabsContent value="general">
        <ProfileForm />
      </TabsContent>
      <TabsContent value="account">
        <AccountSettings />
      </TabsContent>
      <TabsContent value="budget">
        <BudgetSettings />
      </TabsContent>
    </Tabs>
  );
}
