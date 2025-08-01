import Image from "next/image";
import Link from "next/link";

import logoWhite from "@/assets/logo-white.svg";

import { NavigationItem } from "../header/navigation-item";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-4 sm:px-8">
        <nav className="grid gap-8 py-8 sm:grid-cols-12 md:py-12">
          <div className="flex flex-col items-start gap-4 text-neutral-400 sm:col-span-6">
            <Image src={logoWhite} alt="Uplevl Logo White" className="max-h-7 w-auto" priority />
            <p className="text-xs">&copy; 2024-{currentYear} DevBucket, LLC. All rights reserved.</p>
          </div>
          <div className="flex flex-col sm:col-span-2">
            <p className="mb-2 font-bold">Product</p>
            <NavigationItem href="#features" linkOnly className="block py-2 text-sm hover:underline">
              Features
            </NavigationItem>
            <NavigationItem href="#pricing" linkOnly className="block py-2 text-sm hover:underline">
              Pricing
            </NavigationItem>
          </div>
          <div className="flex flex-col sm:col-span-2">
            <p className="mb-2 font-bold">Company</p>
            <a href="mailto:hello@uplevl.ai" className="block py-2 text-sm hover:underline">
              Contact
            </a>
          </div>
          <div className="flex flex-col sm:col-span-2">
            <p className="mb-2 font-bold">Legal</p>
            <Link href="/terms-of-service" className="block py-2 text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="block py-2 text-sm hover:underline">
              Privacy Policy
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
