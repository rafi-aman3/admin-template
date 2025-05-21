"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { signIn, isLoaded: clerkLoaded } = useSignIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email");
      setIsLoading(false);
      return;
    }

    try {
      // Start the password reset process
      const result = await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      console.log(result, "FF");

      // Check if the reset password process was initiated successfully

      // Show success message and redirect after a short delay
      setSuccess(true);

      // Redirect to reset password page after a short delay
      setTimeout(() => {
        window.location.href = `/reset-password?email=${encodeURIComponent(
          email
        )}`;
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          {!success
            ? "Enter your email and we'll send you a verification code to reset your password"
            : "Check your email for a verification code to reset your password"}
        </p>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      {success ? (
        <div className="bg-green-100 text-green-700 text-sm p-3 rounded-md">
          We've sent a verification code to <strong>{email}</strong>. Please
          check your email and enter the code on the next page.
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              autoFocus
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !clerkLoaded}
          >
            {isLoading ? "Processing..." : "Send Reset Link"}
          </Button>
        </div>
      )}

      <div className="text-center text-sm">
        {success ? (
          <Button
            variant="link"
            className="p-0 h-auto font-normal"
            onClick={() => {
              setSuccess(false);
              setEmail("");
            }}
          >
            Try another email
          </Button>
        ) : (
          <>
            Remember your password?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Back to login
            </Link>
          </>
        )}
      </div>
    </form>
  );
}
