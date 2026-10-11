import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  PackageSearch,
  Phone,
  RefreshCw,
  Send,
} from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import siteConfig from "../config/site";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(80, "Name cannot exceed 80 characters."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email address is too long."),

  subject: z
    .string()
    .trim()
    .min(3, "Please enter a subject.")
    .max(120, "Subject cannot exceed 120 characters."),

  message: z
    .string()
    .trim()
    .min(20, "Please enter at least 20 characters.")
    .max(2000, "Message cannot exceed 2,000 characters."),
});

const inputClass =
  "mt-2 block min-h-12 w-full border border-border bg-background px-4 py-3 text-sm text-text outline-none transition placeholder:text-text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/15";

const quickLinks = [
  {
    title: "Order enquiries",
    description: "Find your account's order information.",
    to: "/account/orders",
    icon: PackageSearch,
  },
  {
    title: "Returns & exchange",
    description: "Visit your account's returns section.",
    to: "/account/returns",
    icon: RefreshCw,
  },
  {
    title: "Explore the store",
    description: "Browse the latest collection.",
    to: "/shop",
    icon: ArrowRight,
  },
];

function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  const [formNotice, setFormNotice] = useState("");
  const [emailDraftUrl, setEmailDraftUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contact = siteConfig.contact;
  const hasPlaceholderPhone = contact.phone.includes("X");

  async function handleCopyEmail() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API is unavailable.");
      }

      await navigator.clipboard.writeText(contact.email);
      setCopyStatus("Email address copied.");
    } catch {
      setCopyStatus(
        "Copy is unavailable in this browser. Select the email address and copy it manually."
      );
    }
  }

  function handlePrepareEmail(values) {
    const subject = encodeURIComponent(values.subject);

    const body = encodeURIComponent(
      [
        `Name: ${values.name}`,
        `Reply email: ${values.email}`,
        "",
        "Message:",
        values.message,
      ].join("\n")
    );

    const mailtoUrl =
      `mailto:${contact.email}?subject=${subject}&body=${body}`;

    setEmailDraftUrl(mailtoUrl);

    setFormNotice(
      "Your email draft is ready. Select Open email draft to open your email application. This website does not send or store your message."
    );
  }

  function handleClearForm() {
    reset();
    setFormNotice("");
    setEmailDraftUrl("");
  }

  return (
    <main className="min-h-[60vh] bg-background px-4 pb-16 pt-6 sm:px-8 sm:pb-24 sm:pt-10">
      <div className="mx-auto max-w-[1240px]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-text-muted"
        >
          <Link to="/" className="transition hover:text-primary">
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <span aria-current="page" className="text-text">
            Contact
          </span>
        </nav>

        {/* Page header */}
        <header className="mt-7 border border-border bg-surface px-6 py-8 sm:mt-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary sm:text-xs">
            Customer care · Bajwa&apos;s Collection
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_300px] lg:items-end lg:gap-12">
            <div>
              <h1 className="max-w-3xl font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Here to help, every step of the way.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-text-muted sm:text-base sm:leading-8">
                Questions about the collection or need help navigating
                the store? Explore the quick links or prepare an enquiry
                below.
              </p>
            </div>

            <div className="border-l-2 border-primary bg-surface-muted px-5 py-4">
              <MessageCircle
                size={22}
                className="text-primary"
                aria-hidden="true"
              />

              <p className="mt-3 text-sm font-semibold">
                Customer support
              </p>

              <p className="mt-1 text-xs leading-5 text-text-muted">
                Support hours and response times will be confirmed before
                the store launches.
              </p>
            </div>
          </div>
        </header>

        {/* Quick help */}
        <section
          aria-labelledby="quick-help"
          className="mt-9 sm:mt-12"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                Quick help
              </p>

              <h2
                id="quick-help"
                className="mt-2 font-heading text-2xl sm:text-3xl"
              >
                Where can we guide you?
              </h2>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm text-primary transition hover:text-primary-hover"
            >
              Visit the store
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.to}
                  className="group flex min-h-32 items-start gap-4 border border-border bg-surface p-5 transition hover:border-primary/40 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-6"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center bg-surface-muted text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={20} aria-hidden="true" />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">
                      {item.title}
                    </span>

                    <span className="mt-2 block text-sm leading-6 text-text-muted">
                      {item.description}
                    </span>

                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Open page
                      <ArrowRight size={13} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Contact details and enquiry form */}
        <div className="mt-9 grid items-start gap-5 sm:mt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-7">
          {/* Contact information */}
          <section
            aria-labelledby="contact-details"
            className="border border-border bg-surface p-6 sm:p-8"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
              Get in touch
            </p>

            <h2
              id="contact-details"
              className="mt-3 font-heading text-2xl sm:text-3xl"
            >
              Contact information
            </h2>

            <p className="mt-3 text-sm leading-7 text-text-muted">
              These details come from the existing website configuration.
              Please verify the contact channels before publishing them.
            </p>

            <div className="mt-7 divide-y divide-border">
              {/* Email */}
              <div className="flex items-start gap-4 py-5 first:pt-0">
                <span className="flex size-10 shrink-0 items-center justify-center bg-surface-muted text-primary">
                  <Mail size={19} aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">Email</p>

                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1 block break-words text-sm leading-6 text-text-muted underline decoration-border underline-offset-4 hover:text-primary"
                  >
                    {contact.email}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="mt-3 inline-flex min-h-9 items-center gap-2 border border-border px-3 text-xs font-medium transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {copyStatus === "Email address copied." ? (
                      <Check size={14} aria-hidden="true" />
                    ) : (
                      <Copy size={14} aria-hidden="true" />
                    )}

                    Copy email
                  </button>

                  {copyStatus && (
                    <p
                      role="status"
                      aria-live="polite"
                      className="mt-2 text-xs leading-5 text-text-muted"
                    >
                      {copyStatus}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 py-5">
                <span className="flex size-10 shrink-0 items-center justify-center bg-surface-muted text-primary">
                  <Phone size={19} aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-semibold">Phone</p>

                  {hasPlaceholderPhone ? (
                    <p className="mt-1 text-sm leading-6 text-text-muted">
                      Phone number to be confirmed before launch.
                    </p>
                  ) : (
                    <a
                      href={`tel:${contact.phone}`}
                      className="mt-1 block text-sm text-text-muted hover:text-primary"
                    >
                      {contact.phone}
                    </a>
                  )}
                </div>
              </div>

              {/* Business address */}
              <div className="flex items-start gap-4 py-5">
                <span className="flex size-10 shrink-0 items-center justify-center bg-surface-muted text-primary">
                  <MapPin size={19} aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-semibold">Address</p>

                  <p className="mt-1 text-sm leading-6 text-text-muted">
                    {contact.address}
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4 py-5 last:pb-0">
                <span className="flex size-10 shrink-0 items-center justify-center bg-surface-muted text-primary">
                  <Camera size={19} aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-semibold">Instagram</p>

                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 break-words text-sm text-text-muted transition hover:text-primary"
                  >
                    {contact.instagram}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Contact form */}
          <section
            aria-labelledby="send-enquiry"
            className="border border-border bg-surface p-6 sm:p-8 lg:p-10"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
              Send an enquiry
            </p>

            <h2
              id="send-enquiry"
              className="mt-3 font-heading text-2xl sm:text-3xl"
            >
              Tell us what you need.
            </h2>

            <p className="mt-3 text-sm leading-7 text-text-muted">
              Complete the form to prepare an email in your default email
              application. Messaging is not connected to a website backend.
            </p>

            <form
              noValidate
              onSubmit={handleSubmit(handlePrepareEmail)}
              className="mt-7 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium"
                  >
                    Full name
                  </label>

                  <input
                    id="contact-name"
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputClass}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                    {...register("name")}
                  />

                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="mt-2 text-xs leading-5 text-danger"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium"
                  >
                    Email address
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                    {...register("email")}
                  />

                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-2 text-xs leading-5 text-danger"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-medium"
                >
                  Subject
                </label>

                <input
                  id="contact-subject"
                  placeholder="What is your enquiry about?"
                  className={inputClass}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={
                    errors.subject ? "contact-subject-error" : undefined
                  }
                  {...register("subject")}
                />

                {errors.subject && (
                  <p
                    id="contact-subject-error"
                    role="alert"
                    className="mt-2 text-xs leading-5 text-danger"
                  >
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="How can we assist you?"
                  className={`${inputClass} min-h-36 resize-y`}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  {...register("message")}
                />

                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="mt-2 text-xs leading-5 text-danger"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              {formNotice && (
                <p
                  role="status"
                  aria-live="polite"
                  className="border border-border bg-surface-muted p-4 text-sm leading-6 text-text-muted"
                >
                  {formNotice}
                </p>
              )}

              {emailDraftUrl && (
                <a
                  href={emailDraftUrl}
                  className="inline-flex min-h-11 items-center justify-center gap-2 border border-primary px-5 py-3 text-sm font-medium text-primary transition hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Open email draft
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              )}

              <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <Send size={16} aria-hidden="true" />
                  Prepare email
                </button>

                <button
                  type="button"
                  onClick={handleClearForm}
                  className="inline-flex min-h-11 items-center justify-center px-4 text-sm text-text-muted transition hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Clear form
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Policy links */}
        <section className="mt-7 flex flex-col gap-3 border border-border bg-surface-muted p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <p className="text-sm font-semibold">
              Your information matters.
            </p>

            <p className="mt-1 text-sm leading-6 text-text-muted">
              Read the policies that explain how the storefront is intended
              to handle customer information and website use.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm font-medium text-primary">
            <Link
              to="/privacy"
              className="underline decoration-border underline-offset-4 hover:text-primary-hover"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="underline decoration-border underline-offset-4 hover:text-primary-hover"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Contact;