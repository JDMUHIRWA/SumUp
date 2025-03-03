import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Chart } from "@/components/chart";
import { Notifications } from "@/components/notifications";
import { Transaction } from "@/components/transaction";
import Header from "@/components/header";
import Tab from "@/components/tabs";

export default function Dashboard() {
  function StatCard({
    title,
    value,
  }: {
    title: string;
    value: string;
    growth: string;
  }) {
    return (
      <div className="bg-white rounded-lg p-4 hover:shadow-lg transition duration-300 border border-[#DADADA]">
        {/* Header */}
        <div className="bg-[#FFC23D] p-2 flex items-center justify-center h-[35px] rounded-md">
          <h2 className="text-md font-medium text-black">{title}</h2>
        </div>

        {/* Content */}
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-md font-semibold text-gray-800">Balance</h2>
          <h1 className="text-3xl font-semibold text-gray-800">{value}</h1>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="px-4 transition-all duration-500 ease-in-out w-full">
          <Header />
          {/* Dashboard Stats Section */}
          <h1 className="text-2xl font-semibold text-gray-800 mt-20 sm:mt-10">
            My accounts
          </h1>
          <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[1rem] sm:mt-[1rem] bg-[#FAFAFA]">
            <StatCard title="Bank of Kigali" value="$1,230" growth="+12%" />
            <StatCard title="Mobile Money" value="$45,780" growth="+8%" />
            <StatCard title="Cash Account" value="$320" growth="+15%" />
          </div>

          {/* Dashboard Tables/Charts */}
          <div className=" mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Chart />
            <Notifications />
          </div>

          {/* Transaction summary */}
          <h1 className="text-2xl font-semibold text-gray-800 mt-10">
            Transaction Summary
          </h1>

          <div className="my-3 ">
            <Tab />
          </div>

          {/* Transaction Table */}
          <div>
            <Transaction />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
