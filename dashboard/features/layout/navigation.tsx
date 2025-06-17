import { BotIcon, CircleGaugeIcon, CreditCardIcon, HeadsetIcon, WebhookIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

import { AdminIcon } from "@@/components/icons";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@@/components/ui/sidebar";

interface Route {
  label: string;
  icon: React.ElementType;
  href: string;
  active: boolean;
}

export function Navigation() {
  const { pathname } = useLocation();
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
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Agent",
      icon: BotIcon,
      href: "/agent-settings",
      active: pathname === "/agent-settings",
    },
    {
      label: "Integrations",
      icon: WebhookIcon,
      href: "/integrations",
      active: pathname === "/integrations",
    },
  ];

  const secondaryRoutes: Route[] = [
    {
      label: "Billing",
      icon: CreditCardIcon,
      href: "/billing",
      active: pathname === "/billing",
    },
    {
      label: "Support",
      icon: HeadsetIcon,
      href: "/support",
      active: pathname === "/support",
    },
  ];

  if (isAdminApp) {
    return (
      <SidebarGroup>
        <SidebarMenu>
          {adminRoutes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild tooltip={route.label} isActive={route.active}>
                <Link to={route.href}>
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
                <Link to={route.href}>
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
                <Link to={route.href}>
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
