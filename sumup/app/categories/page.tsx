import Buttons from "@/components/buttons";
import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

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

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="px-4 transition-all duration-500 ease-in-out w-full">
          <Header />
          <div className="flex justify-between mx-auto mt-28">
            <h2 className="text-lg font-medium ">My categories</h2>
            <div className="flex gap-4 mx-4">
              <Buttons />
            </div>
          </div>
          <div className="mt-6">
            <DataTable columns={columns} data={data} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
