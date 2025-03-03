import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Tab from "@/components/tabs";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: "2021-09-01",
      recepient: "John Doe",
      category: "Food",
      invoice: "INV-001",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      date: "2021-09-02",
      recepient: "Jane Doe",
      category: "Transport",
      invoice: "INV-002",
    },
  ];
}
const data = await getData();
export default function Payments() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="px-4 transition-all duration-500 ease-in-out w-full">
          <Header />
          <h1 className="text-2xl font-semibold text-gray-800 mt-20 sm:mt-10">
            Payments
          </h1>
          <div className="my-3 ">
            <Tab />
          </div>

          <div className="container mx-auto py-1">
            <DataTable columns={columns} data={data} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
