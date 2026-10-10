import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { z } from "zod";

import useAuthStore from "../../store/authStore";

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const registerUser = useAuthStore(
    (state) => state.register
  );

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    registerUser({
      name: data.name.trim(),
      email: data.email.trim(),
    });

    // Restore the original protected account destination.
    const from = location.state?.from;
    const pathname = from?.pathname;

    // Only allow redirects to internal customer account pages.
    const isValidAccountPath =
      typeof pathname === "string" &&
      (pathname === "/account" ||
        pathname.startsWith("/account/")) &&
      pathname !== "/account/login" &&
      pathname !== "/account/register";

    const destination = isValidAccountPath
      ? {
          pathname,
          search:
            typeof from.search === "string"
              ? from.search
              : "",
          hash:
            typeof from.hash === "string"
              ? from.hash
              : "",
        }
      : "/account";

    navigate(destination, { replace: true });
  };

  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto flex min-h-[70vh] max-w-[480px] items-center px-4 py-10 sm:px-6 sm:py-14 lg:py-18">
        <div className="w-full">
          {/* Header */}
          <div className="mb-8 text-center sm:mb-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/10 bg-primary/[0.045] text-primary">
              <UserRound
                size={20}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </div>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
              Join Bajwa&apos;s Collection
            </p>

            <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
              Create Account
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted sm:text-base">
              Create your account and make your next
              shopping experience more personal.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-surface shadow-sm">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="p-5 sm:p-7"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-text"
                >
                  Full name
                </label>

                <div className="relative mt-2.5">
                  <UserRound
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
                      errors.name
                        ? "text-primary"
                        : "text-text-muted",
                    ].join(" ")}
                  />

                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name
                        ? "register-name-error"
                        : undefined
                    }
                    {...register("name")}
                    className={[
                      "min-h-13 w-full rounded-xl border bg-background pl-11 pr-4 text-sm text-text outline-none transition",
                      "placeholder:text-text-muted",
                      errors.name
                        ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                        : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
                    ].join(" ")}
                  />
                </div>

                {errors.name && (
                  <p
                    id="register-name-error"
                    className="mt-2 text-xs font-medium text-primary"
                    role="alert"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-text"
                >
                  Email address
                </label>

                <div className="relative mt-2.5">
                  <Mail
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
                      errors.email
                        ? "text-primary"
                        : "text-text-muted",
                    ].join(" ")}
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email
                        ? "register-email-error"
                        : undefined
                    }
                    {...register("email")}
                    className={[
                      "min-h-13 w-full rounded-xl border bg-background pl-11 pr-4 text-sm text-text outline-none transition",
                      "placeholder:text-text-muted",
                      errors.email
                        ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                        : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
                    ].join(" ")}
                  />
                </div>

                {errors.email && (
                  <p
                    id="register-email-error"
                    className="mt-2 text-xs font-medium text-primary"
                    role="alert"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mt-5">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-text"
                >
                  Password
                </label>

                <div className="relative mt-2.5">
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
                      errors.password
                        ? "text-primary"
                        : "text-text-muted",
                    ].join(" ")}
                  />

                  <input
                    id="password"
                    type={
                      showPassword ? "text" : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Create a password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password
                        ? "register-password-error"
                        : undefined
                    }
                    {...register("password")}
                    className={[
                      "min-h-13 w-full rounded-xl border bg-background pl-11 pr-12 text-sm text-text outline-none transition",
                      "placeholder:text-text-muted",
                      errors.password
                        ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                        : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
                    ].join(" ")}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={17}
                        aria-hidden="true"
                      />
                    ) : (
                      <Eye
                        size={17}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>

                {errors.password ? (
                  <p
                    id="register-password-error"
                    className="mt-2 text-xs font-medium text-primary"
                    role="alert"
                  >
                    {errors.password.message}
                  </p>
                ) : (
                  <p className="mt-2 text-[11px] leading-5 text-text-muted">
                    Use at least 6 characters.
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mt-5">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-text"
                >
                  Confirm password
                </label>

                <div className="relative mt-2.5">
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
                      errors.confirmPassword
                        ? "text-primary"
                        : "text-text-muted",
                    ].join(" ")}
                  />

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    aria-invalid={Boolean(
                      errors.confirmPassword
                    )}
                    aria-describedby={
                      errors.confirmPassword
                        ? "register-confirm-password-error"
                        : undefined
                    }
                    {...register("confirmPassword")}
                    className={[
                      "min-h-13 w-full rounded-xl border bg-background pl-11 pr-12 text-sm text-text outline-none transition",
                      "placeholder:text-text-muted",
                      errors.confirmPassword
                        ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                        : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
                    ].join(" ")}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (value) => !value
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {showConfirmPassword ? (
                      <EyeOff
                        size={17}
                        aria-hidden="true"
                      />
                    ) : (
                      <Eye
                        size={17}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p
                    id="register-confirm-password-error"
                    className="mt-2 text-xs font-medium text-primary"
                    role="alert"
                  >
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Creating account..."
                  : "Create Account"}

                {!isSubmitting && (
                  <ArrowRight
                    size={15}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                )}
              </button>

              {/* Already Have Account */}
              <div className="mt-6 border-t border-border pt-6 text-center">
                <p className="text-sm text-text-muted">
                  Already have an account?
                </p>

                <Link
                  to="/account/login"
                  state={location.state}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  Sign in
                  <ArrowRight
                    size={14}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </form>
          </div>

          {/* Small Brand Detail */}
          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
            <span className="h-px w-6 bg-border" />

            <span>Begin your collection</span>

            <span className="h-px w-6 bg-border" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;