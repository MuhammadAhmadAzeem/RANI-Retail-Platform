import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAuthStore from "../../store/authStore";

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

function Profile() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data) => {
    setIsSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 400));

    updateUser({
      name: data.name,
      email: data.email,
    });

    setIsSuccess(true);
  };

  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            Account
          </p>

          <h1 className="mt-3 font-heading text-3xl font-medium text-text sm:text-4xl">
            Profile
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
            Update your personal information for your Bajwa&apos;s
            Collection account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7"
        >
          {isSuccess && (
            <div
              className="mb-6 rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-sm leading-6 text-success"
              role="status"
            >
              Your profile has been updated successfully.
            </div>
          )}

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
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "profile-name-error" : undefined
                }
                {...register("name")}
                className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {errors.name && (
              <p
                id="profile-name-error"
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
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "profile-email-error" : undefined
                }
                {...register("email")}
                className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {errors.email && (
              <p
                id="profile-email-error"
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
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? "Saving changes..." : "Save Changes"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Profile;