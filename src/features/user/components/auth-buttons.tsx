import {
  SignInButton as ClerkSignInButton,
  SignOutButton as ClerkSignOutButton,
  SignUpButton as ClerkSignUpButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

type SignUpButtonProps = React.ComponentProps<typeof ClerkSignUpButton>;

export function SignUpButton({ children = <Button>Sign Up</Button>, ...props }: SignUpButtonProps) {
  return <ClerkSignUpButton {...props}>{children}</ClerkSignUpButton>;
}

type SignInButtonProps = React.ComponentProps<typeof ClerkSignInButton>;

export function SignInButton({ children = <Button>Sign In</Button>, ...props }: SignInButtonProps) {
  return <ClerkSignInButton {...props}>{children}</ClerkSignInButton>;
}

type SignOutButtonProps = React.ComponentProps<typeof ClerkSignOutButton>;

export function SignOutButton({ children = <Button>Sign Out</Button>, ...props }: SignOutButtonProps) {
  return <ClerkSignOutButton {...props}>{children}</ClerkSignOutButton>;
}
