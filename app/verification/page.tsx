"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";

export default function VerificationPage() {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { signUp, isLoaded: clerkLoaded } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!code.trim()) {
      setError("Please enter the verification code");
      setIsLoading(false);
      return;
    }

    try {
      // Attempt to verify the email address
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp?.status !== "complete") {
        // The status can also be 'abandoned' or 'missing_requirements'
        setError("Verification failed. Please try again.");
      } else {
        // Verification successful
        setSuccess(true);
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-bold">Verify your email</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  We've sent a verification code to your email. Please enter it
                  below to complete your registration.
                </p>
              </div>

              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              {success ? (
                <div className="bg-green-100 text-green-700 text-sm p-3 rounded-md">
                  Verification successful! Redirecting to dashboard...
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="Enter verification code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                      disabled={isLoading}
                      className="text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !clerkLoaded}
                  >
                    {isLoading ? "Verifying..." : "Verify Email"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={siteConfig.assets.images.authBackground}
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
