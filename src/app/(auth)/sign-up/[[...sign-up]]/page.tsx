import { SignUp } from "@clerk/nextjs";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Uplevl",
  description: "Sign Up to Uplevl",
};

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SignUp />
    </div>
  );
}
