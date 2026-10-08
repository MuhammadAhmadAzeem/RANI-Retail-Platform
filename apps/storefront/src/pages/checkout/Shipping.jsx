import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Mail,
  MapPin,
  Phone,
  Save,
  Truck,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const shippingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Please enter a valid phone number")
    .regex(
      /^[+0-9\s()-]+$/,
      "Please enter a valid phone number"
    ),

  address: z
    .string()
    .trim()
    .min(5, "Please enter your delivery address"),

  area: z
    .string()
    .trim()
    .min(2, "Please enter your area or locality"),

  city: z
    .string()
    .trim()
    .min(2, "Please enter your city"),

  postalCode: z.string().trim().optional(),

  landmark: z.string().trim().optional(),

  shippingMethod: z
    .string()
    .min(1, "Please select a shipping method"),
});

const shippingMethods = [
  {
    value: "standard",
    label: "Standard Delivery",
    description:
      "Reliable delivery for your everyday orders.",
  },
  {
    value: "express",
    label: "Express Delivery",
    description:
      "A faster delivery option where available.",
  },
];

function Shipping({ user, onSubmit }) {
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState("standard");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: "",
      area: "",
      city: "",
      postalCode: "",
      landmark: "",
      shippingMethod: "standard",
    },
  });

  const handleShippingMethodChange = (value) => {
    setSelectedShippingMethod(value);

    setValue("shippingMethod", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleFormSubmit = async (data) => {
    const cleanedData = {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      address: data.address.trim(),
      area: data.area.trim(),
      city: data.city.trim(),
      postalCode: data.postalCode?.trim() || "",
      landmark: data.landmark?.trim() || "",
      shippingMethod:
        data.shippingMethod || selectedShippingMethod,
    };

    await onSubmit(cleanedData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
    >
      {/* Header */}
      <div className="border-b border-border px-5 py-6 sm:px-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/[0.06] text-primary">
            <MapPin
              size={20}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Step 01
            </p>

            <h2
              id="shipping-heading"
              className="mt-1.5 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl"
            >
              Delivery details
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-text-muted">
              Tell us where you would like your order
              delivered.
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-5 py-6 sm:px-7 sm:py-7">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label
              htmlFor="checkout-name"
              className="text-sm font-semibold text-text"
            >
              Full name
            </label>

            <div className="relative mt-2.5">
              <UserRound
                size={17}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                aria-hidden="true"
              />

              <input
                id="checkout-name"
                type="text"
                autoComplete="name"
                placeholder="Recipient full name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name
                    ? "checkout-name-error"
                    : undefined
                }
                {...register("name")}
                className={[
                  "min-h-13 w-full rounded-xl border bg-background pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-muted",
                  errors.name
                    ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
                ].join(" ")}
              />
            </div>

            {errors.name && (
              <p
                id="checkout-name-error"
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
              htmlFor="checkout-email"
              className="text-sm font-semibold text-text"
            >
              Email address
            </label>

            <div className="relative mt-2.5">
              <Mail
                size={17}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                aria-hidden="true"
              />

              <input
                id="checkout-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email
                    ? "checkout-email-error"
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
                id="checkout-email-error"
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
              htmlFor="checkout-phone"
              className="text-sm font-semibold text-text"
            >
              Phone number
            </label>

            <div className="relative mt-2.5">
              <Phone
                size={17}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                aria-hidden="true"
              />

              <input
                id="checkout-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="03XX XXXXXXX"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone
                    ? "checkout-phone-error"
                    : undefined
                }
                {...register("phone")}
                className={[
                  "min-h-13 w-full rounded-xl border bg-background pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-muted",
                  errors.phone
                    ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
                ].join(" ")}
              />
            </div>

            {errors.phone && (
              <p
                id="checkout-phone-error"
                className="mt-2 text-xs font-medium text-primary"
                role="alert"
              >
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Street Address */}
          <div className="sm:col-span-2">
            <label
              htmlFor="checkout-address"
              className="text-sm font-semibold text-text"
            >
              Street address
            </label>

            <div className="relative mt-2.5">
              <MapPin
                size={17}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-4 top-4 text-text-muted"
                aria-hidden="true"
              />

              <textarea
                id="checkout-address"
                rows={3}
                autoComplete="street-address"
                placeholder="House number, street and block"
                aria-invalid={Boolean(errors.address)}
                aria-describedby={
                  errors.address
                    ? "checkout-address-error"
                    : undefined
                }
                {...register("address")}
                className={[
                  "w-full resize-none rounded-xl border bg-background py-3 pl-11 pr-4 text-sm leading-6 text-text outline-none transition placeholder:text-text-muted",
                  errors.address
                    ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
                ].join(" ")}
              />
            </div>

            {errors.address && (
              <p
                id="checkout-address-error"
                className="mt-2 text-xs font-medium text-primary"
                role="alert"
              >
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Area */}
          <div>
            <label
              htmlFor="checkout-area"
              className="text-sm font-semibold text-text"
            >
              Area / locality
            </label>

            <input
              id="checkout-area"
              type="text"
              autoComplete="address-level3"
              placeholder="Area or locality"
              aria-invalid={Boolean(errors.area)}
              aria-describedby={
                errors.area
                  ? "checkout-area-error"
                  : undefined
              }
              {...register("area")}
              className={[
                "mt-2.5 min-h-13 w-full rounded-xl border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted",
                errors.area
                  ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
              ].join(" ")}
            />

            {errors.area && (
              <p
                id="checkout-area-error"
                className="mt-2 text-xs font-medium text-primary"
                role="alert"
              >
                {errors.area.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="checkout-city"
              className="text-sm font-semibold text-text"
            >
              City
            </label>

            <input
              id="checkout-city"
              type="text"
              autoComplete="address-level2"
              placeholder="City"
              aria-invalid={Boolean(errors.city)}
              aria-describedby={
                errors.city
                  ? "checkout-city-error"
                  : undefined
              }
              {...register("city")}
              className={[
                "mt-2.5 min-h-13 w-full rounded-xl border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted",
                errors.city
                  ? "border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10",
              ].join(" ")}
            />

            {errors.city && (
              <p
                id="checkout-city-error"
                className="mt-2 text-xs font-medium text-primary"
                role="alert"
              >
                {errors.city.message}
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label
              htmlFor="checkout-postal-code"
              className="text-sm font-semibold text-text"
            >
              Postal code
              <span className="ml-2 text-xs font-normal text-text-muted">
                Optional
              </span>
            </label>

            <input
              id="checkout-postal-code"
              type="text"
              autoComplete="postal-code"
              inputMode="numeric"
              placeholder="Postal code"
              {...register("postalCode")}
              className="mt-2.5 min-h-13 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Landmark */}
          <div>
            <label
              htmlFor="checkout-landmark"
              className="text-sm font-semibold text-text"
            >
              Landmark
              <span className="ml-2 text-xs font-normal text-text-muted">
                Optional
              </span>
            </label>

            <input
              id="checkout-landmark"
              type="text"
              placeholder="Nearby landmark"
              {...register("landmark")}
              className="mt-2.5 min-h-13 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Shipping Method */}
          <div className="sm:col-span-2">
            <input
              type="hidden"
              {...register("shippingMethod")}
              value={selectedShippingMethod}
              readOnly
            />

            <div>
              <p className="text-sm font-semibold text-text">
                Shipping method
              </p>

              <p className="mt-1 text-xs leading-5 text-text-muted">
                Choose how you would like your order
                delivered.
              </p>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {shippingMethods.map((method) => {
                const isSelected =
                  selectedShippingMethod === method.value;

                return (
                  <label
                    key={method.value}
                    className={[
                      "relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors",
                      isSelected
                        ? "border-primary/30 bg-primary/[0.04]"
                        : "border-border bg-background hover:border-primary/20 hover:bg-surface-muted/[0.5]",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="shipping-method-choice"
                      value={method.value}
                      checked={isSelected}
                      onChange={() =>
                        handleShippingMethodChange(
                          method.value
                        )
                      }
                      className="sr-only"
                      aria-label={method.label}
                    />

                    <div
                      className={[
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface-muted text-text-muted",
                      ].join(" ")}
                    >
                      {isSelected ? (
                        <Check
                          size={17}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      ) : (
                        <Truck
                          size={17}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={[
                          "text-sm font-semibold",
                          isSelected
                            ? "text-primary"
                            : "text-text",
                        ].join(" ")}
                      >
                        {method.label}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-text-muted">
                        {method.description}
                      </p>

                      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted">
                        Delivery details shown before payment
                      </p>
                    </div>

                    <span
                      className={[
                        "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                        isSelected
                          ? "border-primary"
                          : "border-border",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </span>
                  </label>
                );
              })}
            </div>

            {errors.shippingMethod && (
              <p
                className="mt-2 text-xs font-medium text-primary"
                role="alert"
              >
                {errors.shippingMethod.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-muted text-primary">
              <Check
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>

            <p className="max-w-md text-xs leading-5 text-text-muted">
              Review your delivery details and shipping
              method before continuing.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <Save
              size={15}
              aria-hidden="true"
            />

            {isSubmitting
              ? "Saving..."
              : "Continue to Payment"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Shipping;