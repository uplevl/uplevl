"use client";

import { BotIcon, CircleGaugeIcon, CreditCardIcon, HeadsetIcon, WebhookIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AdminIcon } from "@/components/icons";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface Route {
  label: string;
  icon: React.ElementType;
  href: string;
  active: boolean;
}

export function Navigation() {
  const pathname = usePathname();
  const isAdminApp = pathname.startsWith("/admin");

  const adminRoutes: Route[] = [
    {
      label: "Admin",
      icon: AdminIcon,
      href: "/admin",
      active: pathname.startsWith("/admin"),
    },
  ];

  const primaryRoutes: Route[] = [
    {
      label: "Dashboard",
      icon: CircleGaugeIcon,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Agent",
      icon: BotIcon,
      href: "/dashboard/agent",
      active: pathname === "/dashboard/agent",
    },
    {
      label: "Integrations",
      icon: WebhookIcon,
      href: "/dashboard/integrations",
      active: pathname === "/dashboard/integrations",
    },
  ];

  const secondaryRoutes: Route[] = [
    {
      label: "Billing",
      icon: CreditCardIcon,
      href: "/dashboard/billing",
      active: pathname === "/dashboard/billing",
    },
    {
      label: "Support",
      icon: HeadsetIcon,
      href: "/dashboard/support",
      active: pathname === "/dashboard/support",
    },
  ];

  if (isAdminApp) {
    return (
      <SidebarGroup>
        <SidebarMenu>
          {adminRoutes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild tooltip={route.label} isActive={route.active}>
                <Link href={route.href}>
                  <route.icon className="size-4" />
                  <span className="font-manrope text-sm font-medium">{route.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {primaryRoutes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild tooltip={route.label} isActive={route.active}>
                <Link href={route.href}>
                  <route.icon className="size-4" />
                  <span className="font-manrope text-sm font-medium">{route.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup className="mt-auto">
        <SidebarMenu>
          {secondaryRoutes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild tooltip={route.label} isActive={route.active}>
                <Link href={route.href}>
                  <route.icon className="size-4" />
                  <span className="font-manrope text-sm font-medium">{route.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
