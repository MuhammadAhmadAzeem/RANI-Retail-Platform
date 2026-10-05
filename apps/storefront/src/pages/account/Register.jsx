import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
      name: data.name,
      email: data.email,
    });

    navigate("/account");
  };

  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12 sm:px-6 sm:py-16">
        <div className="w-full">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
              Join Bajwa&apos;s Collection
            </p>

            <h1 className="mt-3 font-heading text-3xl font-medium text-text sm:text-4xl">
              Create Account
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-text-muted">
              Create your account to manage your shopping
              experience.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7"
          >
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-text"
              >
                Full name
              </label>

              <div className="relative mt-2">
                <UserRound
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
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
                  className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {errors.name && (
                <p
                  id="register-name-error"
                  className="mt-2 text-xs text-primary"
                  role="alert"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-text"
              >
                Email address
              </label>

              <div className="relative mt-2">
                <Mail
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
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
                  className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {errors.email && (
                <p
                  id="register-email-error"
                  className="mt-2 text-xs text-primary"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-text"
              >
                Password
              </label>

              <div className="relative mt-2">
                <LockKeyhole
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password
                      ? "register-password-error"
                      : undefined
                  }
                  {...register("password")}
                  className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-12 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
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

              {errors.password && (
                <p
                  id="register-password-error"
                  className="mt-2 text-xs text-primary"
                  role="alert"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-text"
              >
                Confirm password
              </label>

              <div className="relative mt-2">
                <LockKeyhole
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
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
                  className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-12 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
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
                  className="mt-2 text-xs text-primary"
                  role="alert"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Creating account..."
                : "Create Account"}
            </button>

            <p className="mt-6 text-center text-sm text-text-muted">
              Already have an account?{" "}
              <Link
                to="/account/login"
                className="font-semibold text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;