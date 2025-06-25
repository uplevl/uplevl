import Image from "next/image";
import Link from "next/link";

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
} from "@/components/ui/sidebar";

import SidebarUserButton from "@/features/auth/components/sidebar-user-button";
import { Navigation } from "@/features/layouts/components/navigation";

import logo from "@/assets/logo.svg";
import { ToastProvider } from "@/providers/toast.provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <SidebarProvider>
        <Sidebar variant="floating">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center justify-start">
                <SidebarMenuButton asChild size="lg">
                  <Link href="/dashboard" className="py-4">
                    <Image src={logo} alt="Uplevl Logo" className="max-h-8 w-auto" priority />
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
                <SidebarUserButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <main className="container mx-auto flex-1">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ToastProvider>
  );
}
