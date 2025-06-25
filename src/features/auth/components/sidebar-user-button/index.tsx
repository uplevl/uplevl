import { LogOutIcon } from "lucide-react";
import { Suspense } from "react";

import { SidebarMenuButton } from "@/components/ui/sidebar";

import { getCurrentUser } from "@/features/auth/actions/user";
import { SignOutButton } from "@/features/auth/components/auth-buttons";

import { SidebarUserDropdown } from "./sidebar-user-dropdown";

export default function SidebarUserButton() {
  return (
    <Suspense>
      <SuspendedSidebarUserButton />
    </Suspense>
  );
}

async function SuspendedSidebarUserButton() {
  const { user } = await getCurrentUser({ allData: true });

  if (!user) {
    return (
      <SignOutButton>
        <SidebarMenuButton>
          <LogOutIcon />
          <span>Log Out</span>
        </SidebarMenuButton>
      </SignOutButton>
    );
  }

  return (
    <SidebarUserDropdown
      user={{
        name: [user.firstName, user.lastName].filter(Boolean).join(" "),
        imageUrl: user.imageUrl,
        email: user.email,
      }}
    />
  );
}
