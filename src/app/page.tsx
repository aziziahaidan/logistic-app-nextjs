"use client";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <>
      <SignedOut>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-primary">Welcome</h1>
          <p className="mb-4 text-base-content/70">Please sign in to continue.</p>
          <SignInButton>
            <button className="btn btn-primary">Sign In</button>
          </SignInButton>
          <div className="mt-4">

            {/* <Waitlist /> */}
            {/* <SignUpButton>
              <button className="btn btn-accent">Sign Up</button>
            </SignUpButton> */}
          </div>
        </div>

      </SignedOut>
    </>
  );
}

