"use client";

import { useState, useEffect } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  // Form states
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // UI states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Password validation states
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [passwordRequirementsMet, setPasswordRequirementsMet] =
    useState<boolean>(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] =
    useState<boolean>(false);

  // Flow control
  const [step, setStep] = useState<"verify" | "reset">("verify");
  const [verificationComplete, setVerificationComplete] =
    useState<boolean>(false);

  const { signIn, isLoaded: clerkLoaded } = useSignIn();
  const searchParams = useSearchParams();

  // Get the token from the URL
  const token = searchParams.get("token");

  useEffect(() => {
    // Get email from URL if available
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

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

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!code.trim()) {
      setError("Please enter the verification code");
      setIsLoading(false);
      return;
    }

    if (!email.trim()) {
      setError(
        "Email is required. Please go back to the forgot password page."
      );
      setIsLoading(false);
      return;
    }

    try {
      // Verify the OTP code
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        // The email is already associated with the reset attempt
        // 'identifier' is not a valid parameter for this request
      });

      if (result?.status === "needs_new_password") {
        // OTP verification successful, move to password reset step
        setVerificationComplete(true);
        setStep("reset");
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate password
    const passwordValidationErrors = validatePassword(password);
    if (passwordValidationErrors.length > 0) {
      setPasswordErrors(passwordValidationErrors);
      setIsLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Reset the password
      const result = await signIn?.resetPassword({
        password,
      });

      if (result?.status === "complete") {
        setSuccess(true);
        // Redirect to dashboard after a short delay since user is already signed in
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during password reset");
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
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset your password</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  {success
                    ? "Your password has been reset successfully"
                    : step === "verify"
                    ? "Enter the verification code sent to your email"
                    : "Enter your new password below"}
                </p>
              </div>

              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              {success ? (
                <div className="bg-green-100 text-green-700 text-sm p-3 rounded-md">
                  Password reset successful! Redirecting to dashboard...
                </div>
              ) : step === "verify" ? (
                <form onSubmit={handleVerifyOTP} className="grid gap-6">
                  {email && (
                    <div className="text-muted-foreground text-sm text-center">
                      We've sent a verification code to <strong>{email}</strong>
                    </div>
                  )}

                  <div className="grid gap-3">
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
                    {isLoading ? "Verifying..." : "Verify Code"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="password">New Password</Label>
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
                          <li
                            className={
                              password.length >= 8 ? "text-green-500" : ""
                            }
                          >
                            At least 8 characters
                          </li>
                          <li
                            className={
                              /[A-Z]/.test(password) ? "text-green-500" : ""
                            }
                          >
                            At least one uppercase letter
                          </li>
                          <li
                            className={
                              /[a-z]/.test(password) ? "text-green-500" : ""
                            }
                          >
                            At least one lowercase letter
                          </li>
                          <li
                            className={
                              /[0-9]/.test(password) ? "text-green-500" : ""
                            }
                          >
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
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? "Hide password"
                            : "Show password"}
                        </span>
                      </Button>
                    </div>
                    {confirmPassword &&
                      confirmPasswordFocused &&
                      (password === confirmPassword ? (
                        <p className="text-green-500 text-xs mt-1">
                          Passwords match ✓
                        </p>
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
                    {isLoading ? "Processing..." : "Reset Password"}
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
