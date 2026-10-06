import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarDays,
  Check,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
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

  phone: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" ||
        /^[+0-9\s()-]{7,20}$/.test(value),
      "Please enter a valid phone number"
    ),

  dateOfBirth: z.string().optional(),
});

function Profile() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore(
    (state) => state.updateUser
  );

  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      dateOfBirth: user?.dateOfBirth || "",
    },
  });

  useEffect(() => {
    reset({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      dateOfBirth: user?.dateOfBirth || "",
    });
  }, [
    user?.name,
    user?.email,
    user?.phone,
    user?.dateOfBirth,
    reset,
  ]);

  const onSubmit = async (data) => {
    setSaved(false);

    await new Promise((resolve) =>
      setTimeout(resolve, 400)
    );

    updateUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth || "",
    });

    setSaved(true);
  };

  const displayName = user?.name || "Customer";

  return (
    <main className="min-h-[70vh] bg-background">
      <div className="max-w-3xl">
        {/* Header */}
        <header className="border-b border-border pb-7 sm:pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            Personal information
          </p>

          <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
            Profile
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted sm:text-base">
            Keep your personal information up to date for
            your account.
          </p>
        </header>

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-7 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7 lg:p-8"
        >
          {/* Identity */}
          <div className="flex items-center gap-4 border-b border-border pb-7">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <UserRound
                size={24}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                Account holder
              </p>

              <h2 className="mt-1 truncate font-heading text-2xl font-medium tracking-tight text-text">
                {displayName}
              </h2>

              <p className="mt-1 truncate text-sm text-text-muted">
                {user?.email || "No email available"}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-text"
              >
                Full name
              </label>

              <div className="relative mt-2">
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
                      ? "profile-name-error"
                      : undefined
                  }
                  {...register("name")}
                  onFocus={() => setSaved(false)}
                  className={[
                    "min-h-12 w-full rounded-xl border bg-background pl-11 pr-4 text-sm text-text outline-none transition",
                    "placeholder:text-text-muted",
                    errors.name
                      ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
                  ].join(" ")}
                />
              </div>

              {errors.name && (
                <p
                  id="profile-name-error"
                  className="mt-2 text-xs font-medium text-primary"
                  role="alert"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-text"
              >
                Email address
              </label>

              <div className="relative mt-2">
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
                      ? "profile-email-error"
                      : undefined
                  }
                  {...register("email")}
                  onFocus={() => setSaved(false)}
                  className={[
                    "min-h-12 w-full rounded-xl border bg-background pl-11 pr-4 text-sm text-text outline-none transition",
                    "placeholder:text-text-muted",
                    errors.email
                      ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
                  ].join(" ")}
                />
              </div>

              {errors.email && (
                <p
                  id="profile-email-error"
                  className="mt-2 text-xs font-medium text-primary"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-semibold text-text"
              >
                Phone number
              </label>

              <div className="relative mt-2">
                <Phone
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className={[
                    "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
                    errors.phone
                      ? "text-primary"
                      : "text-text-muted",
                  ].join(" ")}
                />

                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="03XX XXXXXXX"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone
                      ? "profile-phone-error"
                      : undefined
                  }
                  {...register("phone")}
                  onFocus={() => setSaved(false)}
                  className={[
                    "min-h-12 w-full rounded-xl border bg-background pl-11 pr-4 text-sm text-text outline-none transition",
                    "placeholder:text-text-muted",
                    errors.phone
                      ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
                  ].join(" ")}
                />
              </div>

              {errors.phone && (
                <p
                  id="profile-phone-error"
                  className="mt-2 text-xs font-medium text-primary"
                  role="alert"
                >
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="sm:col-span-2">
              <label
                htmlFor="dateOfBirth"
                className="text-sm font-semibold text-text"
              >
                Date of birth
                <span className="ml-2 text-xs font-normal text-text-muted">
                  Optional
                </span>
              </label>

              <div className="relative mt-2">
                <CalendarDays
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className={[
                    "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
                    errors.dateOfBirth
                      ? "text-primary"
                      : "text-text-muted",
                  ].join(" ")}
                />

                <input
                  id="dateOfBirth"
                  type="date"
                  autoComplete="bday"
                  aria-invalid={Boolean(
                    errors.dateOfBirth
                  )}
                  aria-describedby={
                    errors.dateOfBirth
                      ? "profile-dob-error"
                      : undefined
                  }
                  {...register("dateOfBirth")}
                  onFocus={() => setSaved(false)}
                  className={[
                    "min-h-12 w-full rounded-xl border bg-background pl-11 pr-4 text-sm text-text outline-none transition",
                    errors.dateOfBirth
                      ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
                  ].join(" ")}
                />
              </div>

              {errors.dateOfBirth && (
                <p
                  id="profile-dob-error"
                  className="mt-2 text-xs font-medium text-primary"
                  role="alert"
                >
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-text-muted">
              Update your details whenever something changes.
            </p>

            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isSubmitting ? (
                "Saving..."
              ) : saved ? (
                <>
                  <Check
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  Changes Saved
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>

          {/* Success */}
          {saved && (
            <div
              className="mt-5 flex items-start gap-3 rounded-xl border border-success/20 bg-success/[0.05] px-4 py-3.5 text-sm text-success"
              role="status"
            >
              <Check
                size={17}
                strokeWidth={2}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />

              <span>
                Your profile information has been updated
                successfully.
              </span>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

export default Profile;