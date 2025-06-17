import { UserButton } from "@clerk/clerk-react";
import { Link, Outlet } from "react-router";

import Logo from "@@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@@/components/ui/sidebar";

import { Navigation } from "./navigation";

export function Layout() {
  return (
    <SidebarProvider>
      <Sidebar variant="floating">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-start">
              <SidebarMenuButton asChild size="lg">
                <Link to="/dashboard" className="py-4">
                  <Logo />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <Navigation />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <UserButton showName />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="container mx-auto flex-1 p-2 pl-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
