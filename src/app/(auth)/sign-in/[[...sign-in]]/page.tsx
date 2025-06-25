import { SignIn } from "@clerk/nextjs";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Uplevl",
  description: "Sign In to Uplevl",
};

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
