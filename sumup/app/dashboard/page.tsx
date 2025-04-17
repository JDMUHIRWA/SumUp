import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Chart } from "@/components/chart";
import { Notifications } from "@/components/notifications";
import Header from "@/components/header";
import Tab from "@/components/tabs";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns";
import { AccountSettings } from "@/components/account-settings";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      category: "Food",
    },
    {
      id: "489e1d42",
      category: "Transport",
    },
  ];
}

const data = await getData();

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
          <div className="mt-4 ">
            <AccountSettings hideCreate={true} />
          </div>

          {/* Dashboard Tables/Charts */}
          <div className=" mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Chart />
            <Notifications />
          </div>

          {/* Transaction summary */}
          <h2 className="text-lg font-semibold text-gray-900 mt-10">
            Transaction Summary
          </h2>

          <div className="my-4 ">
            <Tab />
          </div>

          {/* Transaction Table */}
          <DataTable columns={columns} data={data} />
        </main>
      </div>
    </SidebarProvider>
  );
}
