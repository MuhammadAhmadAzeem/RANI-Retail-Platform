import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

function ForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async () => {
    setIsSuccess(false);

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setIsSuccess(true);
  };

  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12 sm:px-6 sm:py-16">
        <div className="w-full">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
              Account recovery
            </p>

            <h1 className="mt-3 font-heading text-3xl font-medium text-text sm:text-4xl">
              Forgot Password
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-text-muted">
              Enter your email address and we&apos;ll help
              you recover access to your account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7"
          >
            {isSuccess && (
              <div
                className="mb-5 rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-sm leading-6 text-success"
                role="status"
              >
                Password recovery instructions have been
                requested for this email address.
              </div>
            )}

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
                      ? "forgot-password-email-error"
                      : undefined
                  }
                  {...register("email")}
                  className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {errors.email && (
                <p
                  id="forgot-password-email-error"
                  className="mt-2 text-xs text-primary"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Sending..."
                : "Send Recovery Instructions"}
            </button>

            <Link
              to="/account/login"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/30 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <ArrowLeft
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
              />
              Back to Sign In
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;