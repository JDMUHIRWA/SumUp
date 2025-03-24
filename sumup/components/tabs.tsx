import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Tab() {
  return (
    <>
      <Tabs defaultValue="bk" className="w-[595px] border-[#e4e4e7] shadow-md">
        <TabsList className="bg-white-200  w-full flex justify-start h-[35px] gap-4">
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
