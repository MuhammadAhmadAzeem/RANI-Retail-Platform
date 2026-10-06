import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CheckCircle2,
  LockKeyhole,
  Mail,
} from "lucide-react";
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
      <section className="mx-auto flex min-h-[70vh] max-w-lg items-center px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
        <div className="w-full">
          {/* Intro */}
          <div className="mb-7 text-center sm:mb-9">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/10 bg-primary/[0.045] text-primary">
              <LockKeyhole
                size={22}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </div>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
              Account recovery
            </p>

            <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
              Forgot Password?
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted sm:text-base">
              Enter the email address linked to your account
              and we&apos;ll help you recover access securely.
            </p>
          </div>

          {/* Recovery Card */}
          <div className="rounded-2xl border border-border bg-surface shadow-sm">
            <div className="px-5 py-6 sm:px-7 sm:py-8">
              {isSuccess ? (
                /* Success State */
                <div
                  className="text-center"
                  role="status"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-success/15 bg-success/[0.07] text-success">
                    <CheckCircle2
                      size={30}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-success">
                    Request received
                  </p>

                  <h2 className="mt-2 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl">
                    Check your email
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
                    Password recovery instructions have been
                    requested for your email address.
                  </p>

                  <div className="mt-6 rounded-xl border border-border bg-background px-4 py-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/[0.06] text-primary">
                        <Mail
                          size={16}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                          Recovery email
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-text">
                          Email address submitted
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      to="/account/login"
                      className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      Return to Sign In
                    </Link>

                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <Mail
                        size={15}
                        aria-hidden="true"
                      />
                      Try Another Email
                    </button>
                  </div>
                </div>
              ) : (
                /* Form State */
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <div className="rounded-xl border border-primary/10 bg-primary/[0.025] px-4 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/[0.06] text-primary">
                        <LockKeyhole
                          size={15}
                          aria-hidden="true"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-text">
                          Reset your password
                        </p>

                        <p className="mt-1 text-xs leading-5 text-text-muted">
                          Enter your account email to receive
                          recovery instructions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
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
                            ? "forgot-password-email-error"
                            : undefined
                        }
                        {...register("email")}
                        className={[
                          "min-h-13 w-full rounded-xl border bg-background pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-muted",
                          errors.email
                            ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                            : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
                        ].join(" ")}
                      />
                    </div>

                    {errors.email && (
                      <p
                        id="forgot-password-email-error"
                        className="mt-2 text-xs font-medium text-primary"
                        role="alert"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Mail
                      size={15}
                      aria-hidden="true"
                    />

                    {isSubmitting
                      ? "Sending..."
                      : "Send Recovery Instructions"}
                  </button>

                  <Link
                    to="/account/login"
                    className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <ArrowLeft
                      size={16}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    Back to Sign In
                  </Link>
                </form>
              )}
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-text-muted">
            Need help accessing your account?
          </p>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;