"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { siteConfig } from "@/config/site";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        // Redirect to dashboard if user is logged in
        router.push("/dashboard");
      } else {
        // Redirect to login page if user is not logged in
        router.push("/login");
      }
    }
  }, [isLoaded, isSignedIn, router]);

  // Return a splash screen with logo and loading animation while checking authentication
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background">
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <img
            src={siteConfig.logo.image}
            alt={siteConfig.logo.text}
            width={48}
            height={48}
          />
        </div>
        <h1 className="text-2xl font-bold">{siteConfig.logo.text}</h1>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
