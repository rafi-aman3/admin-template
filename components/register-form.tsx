"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [passwordRequirementsMet, setPasswordRequirementsMet] =
    useState<boolean>(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] =
    useState<boolean>(false);

  const { signUp, isLoaded: clerkLoaded } = useSignUp();
  const router = useRouter();

  const validatePassword = (pass: string) => {
    const errors = [];

    if (pass.length < 8) {
      errors.push("Password must be at least 8 characters");
    }

    if (!/[A-Z]/.test(pass)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(pass)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(pass)) {
      errors.push("Password must contain at least one number");
    }

    setPasswordRequirementsMet(errors.length === 0 && pass.length > 0);
    return errors;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordErrors(validatePassword(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate inputs
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name");
      setIsLoading(false);
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email");
      setIsLoading(false);
      return;
    }

    const passwordValidationErrors = validatePassword(password);
    if (passwordValidationErrors.length > 0) {
      setPasswordErrors(passwordValidationErrors);
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Create the user with Clerk
      const result = await signUp?.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      // Prepare verification (optional, depends on Clerk settings)
      await result?.prepareEmailAddressVerification({ strategy: "email_code" });

      // Redirect to verification page
      window.location.href = "/verification";
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
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
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create your account
        </p>
      </div>
      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isLoading}
              autoFocus
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>

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
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              required
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          {passwordFocused && !passwordRequirementsMet && (
            <div className="text-muted-foreground text-xs mt-1">
              <p>Password requirements:</p>
              <ul className="list-disc pl-4 space-y-0.5 mt-1">
                <li className={password.length >= 8 ? "text-green-500" : ""}>
                  At least 8 characters
                </li>
                <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
                  At least one uppercase letter
                </li>
                <li className={/[a-z]/.test(password) ? "text-green-500" : ""}>
                  At least one lowercase letter
                </li>
                <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>
                  At least one number
                </li>
              </ul>
            </div>
          )}
          {passwordRequirementsMet && (
            <p className="text-green-500 text-xs mt-1">
              Password requirements met ✓
            </p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={() => setConfirmPasswordFocused(false)}
              required
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showConfirmPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          {confirmPassword &&
            confirmPasswordFocused &&
            (password === confirmPassword ? (
              <p className="text-green-500 text-xs mt-1">Passwords match ✓</p>
            ) : (
              <p className="text-muted-foreground text-xs mt-1">
                Please make sure passwords match
              </p>
            ))}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !clerkLoaded}
        >
          {isLoading ? "Processing..." : "Register"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
