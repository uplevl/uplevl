import { LogOutIcon } from "lucide-react";
import { Suspense } from "react";

import { SidebarMenuButton } from "@/components/ui/sidebar";

import { getCurrentUser } from "@/features/user/api/queries";
import { SignOutButton } from "@/features/user/components/auth-buttons";
import { SidebarUserDropdown } from "@/features/user/components/sidebar-user-dropdown";

export function SidebarUserButton() {
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
