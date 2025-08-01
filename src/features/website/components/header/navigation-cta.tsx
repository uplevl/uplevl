"use client";

import Link from "next/link";

import { useFeatureFlag } from "@/hooks/use-feature-flag";

import { PlayIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

import { SignedIn, SignedOut } from "@/features/user/components/sign-in-status";
import { WaitlistDialog } from "@/features/waitlist/components/waitlist-dialog";

import { NavigationItem } from "./navigation-item";

export default function NavigationCta() {
  const dashboardAccessEnabled = useFeatureFlag("dashboard-access");

  if (!dashboardAccessEnabled) {
    return <WaitlistDialog />;
  }

  return (
    <>
      <SignedIn>
        <Button asChild>
          <Link href="/dashboard">
            <span>Dashboard</span>
            <PlayIcon />
          </Link>
        </Button>
      </SignedIn>
      <SignedOut>
        <NavigationItem href="/sign-in">Sign In</NavigationItem>
        <Button asChild>
          <Link href="/sign-up">
            <span>Get Started</span>
            <PlayIcon />
          </Link>
        </Button>
      </SignedOut>
    </>
  );
}
