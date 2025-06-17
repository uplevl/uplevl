import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
