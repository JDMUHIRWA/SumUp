"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: Inbox,
  },
  {
    title: "Budget",
    url: "/budget",
    icon: Calendar,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <>
      <Sidebar className="bg-black rounded-lg z-50">
        <SidebarContent className="rounded-tr-lg bg-[#000000]">
          <SidebarGroupLabel className="flex mt-5">
            <Image src="/logo.svg" alt="SumUp" width={207} height={40} />
          </SidebarGroupLabel>
          <SidebarGroup className="mt-10 bg">
            <SidebarGroupContent>
              <SidebarMenu className="text-[#FFFFFF]">
                {items.map((item) => {
                  const isActive = pathname === item.url; // Check if the item is active
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-[#ff8d41bc] hover:text-white ${
                          isActive ? "bg-[#ff8d41bc] text-white" : ""
                        }`}
                      >
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className="">
          <SidebarMenu>
            <SidebarMenuItem>
              <SignedIn>
                <UserButton showName />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
