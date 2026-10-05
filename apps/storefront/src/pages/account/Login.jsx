import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
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
      <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12 sm:px-6 sm:py-16">
        <div className="w-full">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
              Welcome back
            </p>

            <h1 className="mt-3 font-heading text-3xl font-medium text-text sm:text-4xl">
              Sign In
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-text-muted">
              Sign in to your Bajwa&apos;s Collection account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7"
          >
            <div>
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
                      ? "login-email-error"
                      : undefined
                  }
                  {...register("email")}
                  className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {errors.email && (
                <p
                  id="login-email-error"
                  className="mt-2 text-xs text-primary"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-text"
                >
                  Password
                </label>

                <Link
                  to="/account/forgot-password"
                  className="text-xs font-medium text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative mt-2">
                <LockKeyhole
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password
                      ? "login-password-error"
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
                  id="login-password-error"
                  className="mt-2 text-xs text-primary"
                  role="alert"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            <p className="mt-6 text-center text-sm text-text-muted">
              Don&apos;t have an account?{" "}
              <Link
                to="/account/register"
                className="font-semibold text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                Create account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;