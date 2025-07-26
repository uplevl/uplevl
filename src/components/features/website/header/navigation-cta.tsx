"use client";

import Link from "next/link";

import { useFeatureFlag } from "@/hooks/use-feature-flag";

import { SignedIn, SignedOut } from "@/components/features/auth/sign-in-status";
import { PlayIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

import { Waitlist } from "../waitlist";
import { NavigationItem } from "./navigation-item";

// import { NavigationItem } from "./navigation-item";

export default function NavigationCta() {
  const dashboardAccessEnabled = useFeatureFlag("dashboard-access");

  if (!dashboardAccessEnabled) {
    return <Waitlist />;
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
