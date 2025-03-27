import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Tab() {
  return (
    <>
      <Tabs
        defaultValue="general"
        className="w-[595px] border-[#e4e4e7] shadow-md"
      >
        <TabsList className="bg-white-200  w-full flex justify-start h-[35px] gap-4">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-[#FFC23D] data-[state=active]:text-black data-[state=active]:font-nomral w-1/3"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-[#FFC23D] data-[state=active]:text-black data-[state=active]:font-nomral w-1/3"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="budget"
            className="data-[state=active]:bg-[#FFC23D] data-[state=active]:text-black data-[state=active]:font-normal w-1/3"
          >
            Budget
          </TabsTrigger>
          <TabsTrigger
            value="about-help"
            className="data-[state=active]:bg-[#FFC23D] data-[state=active]:text-black data-[state=active]:font-normal w-1/3"
          >
            About & Help
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
