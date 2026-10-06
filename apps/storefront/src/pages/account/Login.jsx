import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import useAuthStore from "../../store/authStore";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    login({
      name: data.email.split("@")[0],
      email: data.email,
    });

    navigate("/account");
  };

  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto flex min-h-[70vh] max-w-[460px] items-center px-4 py-10 sm:px-6 sm:py-16">
        <div className="w-full">
          {/* Header */}
          <div className="mb-8 text-center sm:mb-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/10 bg-primary/[0.045] text-primary">
              <LockKeyhole
                size={20}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </div>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
              Welcome back
            </p>

            <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
              Sign In
            </h1>

            <p className="mt-3 text-sm leading-6 text-text-muted">
              Sign in to your Bajwa&apos;s Collection account.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-border bg-surface shadow-sm">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="p-5 sm:p-7"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-text"
                >
                  Email address
                </label>

                <div className="relative mt-2.5">
                  <Mail
                    size={17}
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
                        ? "login-email-error"
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
                    id="login-email-error"
                    className="mt-2 text-xs font-medium text-primary"
                    role="alert"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mt-5">
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-text"
                  >
                    Password
                  </label>

                  <Link
                    to="/account/forgot-password"
                    className="rounded text-xs font-semibold text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative mt-2.5">
                  <LockKeyhole
                    size={17}
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
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password
                        ? "login-password-error"
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

                {errors.password && (
                  <p
                    id="login-password-error"
                    className="mt-2 text-xs font-medium text-primary"
                    role="alert"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Sign In */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}

                {!isSubmitting && (
                  <ArrowRight
                    size={15}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                )}
              </button>

              {/* Create Account */}
              <div className="mt-6 border-t border-border pt-6 text-center">
                <p className="text-sm text-text-muted">
                  New to Bajwa&apos;s Collection?
                </p>

                <Link
                  to="/account/register"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  Create an account
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;