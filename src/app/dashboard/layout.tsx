import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import Image from "next/image";
import Link from "next/link";
import { extractRouterConfig } from "uploadthing/server";

import { SidebarUserButton } from "@/components/features/auth/sidebar-user-button";
import { Navigation } from "@/components/layouts/navigation";
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

import { postImageFileRouter } from "@/app/api/uploadthing/core";
import logo from "@/assets/logo.svg";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextSSRPlugin routerConfig={extractRouterConfig(postImageFileRouter)} />
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
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
