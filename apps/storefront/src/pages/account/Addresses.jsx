import {
  Building2,
  Check,
  House,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Save,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "rani-storefront-addresses";

const emptyForm = {
  label: "Home",
  name: "",
  phone: "",
  address: "",
  area: "",
  city: "",
  postalCode: "",
  landmark: "",
  isDefault: false,
};

function readSavedAddresses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getAddressIcon(label) {
  if (label === "Home") {
    return House;
  }

  if (label === "Work") {
    return Building2;
  }

  return MapPin;
}

function Addresses() {
  const [addresses, setAddresses] = useState(
    readSavedAddresses
  );

  const [form, setForm] = useState(emptyForm);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(addresses)
      );
    } catch {
      // Frontend demo persistence is best-effort.
    }
  }, [addresses]);

  const openCreateForm = () => {
    setEditingId(null);

    setForm({
      ...emptyForm,
      isDefault: addresses.length === 0,
    });

    setNotice("");
    setIsFormOpen(true);
  };

  const openEditForm = (address) => {
    setEditingId(address.id);

    setForm({
      label: address.label || "Home",
      name: address.name || "",
      phone: address.phone || "",
      address: address.address || "",
      area: address.area || "",
      city: address.city || "",
      postalCode: address.postalCode || "",
      landmark: address.landmark || "",
      isDefault: Boolean(address.isDefault),
    });

    setNotice("");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setNotice("");
  };

  const handleLabelChange = (label) => {
    setForm((current) => ({
      ...current,
      label,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedForm = {
      ...form,
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      area: form.area.trim(),
      city: form.city.trim(),
      postalCode: form.postalCode.trim(),
      landmark: form.landmark.trim(),
    };

    if (
      !cleanedForm.name ||
      !cleanedForm.phone ||
      !cleanedForm.address ||
      !cleanedForm.area ||
      !cleanedForm.city
    ) {
      setNotice(
        "Please complete all required address fields."
      );
      return;
    }

    if (
      !/^[+0-9\s()-]{7,20}$/.test(
        cleanedForm.phone
      )
    ) {
      setNotice(
        "Please enter a valid phone number."
      );
      return;
    }

    if (editingId) {
      setAddresses((current) => {
        const updated = current.map((address) =>
          address.id === editingId
            ? {
                ...address,
                ...cleanedForm,
              }
            : cleanedForm.isDefault
              ? {
                  ...address,
                  isDefault: false,
                }
              : address
        );

        if (
          updated.length > 0 &&
          !updated.some(
            (address) => address.isDefault
          )
        ) {
          updated[0] = {
            ...updated[0],
            isDefault: true,
          };
        }

        return updated;
      });

      setNotice("Address updated successfully.");
    } else {
      const newAddress = {
        id:
          typeof crypto !== "undefined" &&
          crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}`,
        ...cleanedForm,
        isDefault:
          cleanedForm.isDefault ||
          addresses.length === 0,
      };

      setAddresses((current) =>
        current.map((address) =>
          newAddress.isDefault
            ? {
                ...address,
                isDefault: false,
              }
            : address
        ).concat(newAddress)
      );

      setNotice("Address added successfully.");
    }

    setForm(emptyForm);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSetDefault = (id) => {
    setAddresses((current) =>
      current.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );

    setNotice("Default address updated.");
  };

  const handleRemove = (id) => {
    const addressToRemove = addresses.find(
      (address) => address.id === id
    );

    if (!addressToRemove) {
      return;
    }

    const shouldRemove = window.confirm(
      `Remove ${addressToRemove.label || "this"} address?`
    );

    if (!shouldRemove) {
      return;
    }

    setAddresses((current) => {
      const remaining = current.filter(
        (address) => address.id !== id
      );

      if (
        remaining.length > 0 &&
        !remaining.some(
          (address) => address.isDefault
        )
      ) {
        remaining[0] = {
          ...remaining[0],
          isDefault: true,
        };
      }

      return remaining;
    });

    setNotice("Address removed.");
  };

  return (
    <section className="min-w-0">
      {/* Header */}
      <header className="border-b border-border pb-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              Delivery details
            </p>

            <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-text sm:text-4xl">
              Saved addresses
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
              Keep your delivery details ready for a
              smoother shopping experience.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              {addresses.length}{" "}
              {addresses.length === 1
                ? "address"
                : "addresses"}
            </span>

            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <Plus
                size={15}
                aria-hidden="true"
              />
              Add Address
            </button>
          </div>
        </div>
      </header>

      {/* Notice */}
      {notice && (
        <div
          className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-success/20 bg-success/[0.05] px-4 py-3 text-sm text-success"
          role="status"
        >
          <div className="flex items-center gap-2.5">
            <Check
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />

            <span>{notice}</span>
          </div>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            className="shrink-0 text-success/70 transition-colors hover:text-success"
          >
            <X
              size={15}
              aria-hidden="true"
            />
          </button>
        </div>
      )}

      {/* Address Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7"
        >
          <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                {editingId
                  ? "Update address"
                  : "New delivery address"}
              </p>

              <h2 className="mt-2 font-heading text-2xl font-medium text-text">
                {editingId
                  ? "Edit address"
                  : "Add an address"}
              </h2>
            </div>

            <button
              type="button"
              onClick={closeForm}
              aria-label="Close address form"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <X
                size={16}
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-text">
              Address label
            </p>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {["Home", "Work", "Other"].map(
                (label) => {
                  const Icon =
                    getAddressIcon(label);

                  const isSelected =
                    form.label === label;

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() =>
                        handleLabelChange(label)
                      }
                      className={[
                        "flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors",
                        isSelected
                          ? "border-primary bg-primary/[0.06] text-primary"
                          : "border-border bg-background text-text-muted hover:border-primary/20 hover:text-primary",
                      ].join(" ")}
                    >
                      <Icon
                        size={15}
                        aria-hidden="true"
                      />

                      {label}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-semibold text-text"
              >
                Full name
              </label>

              <div className="relative mt-2">
                <UserRound
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  placeholder="Recipient name"
                  className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
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
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                />

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="03XX XXXXXXX"
                  className="min-h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            {/* Street Address */}
            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="text-sm font-semibold text-text"
              >
                Street address
              </label>

              <div className="relative mt-2">
                <MapPin
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-4 text-text-muted"
                />

                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  rows={3}
                  placeholder="House number, street and block"
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 pl-11 text-sm leading-6 text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            {/* Area */}
            <div>
              <label
                htmlFor="area"
                className="text-sm font-semibold text-text"
              >
                Area / locality
              </label>

              <input
                id="area"
                name="area"
                type="text"
                value={form.area}
                onChange={handleChange}
                autoComplete="address-level3"
                placeholder="Area or locality"
                className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="text-sm font-semibold text-text"
              >
                City
              </label>

              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                autoComplete="address-level2"
                placeholder="City"
                className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Postal Code */}
            <div>
              <label
                htmlFor="postalCode"
                className="text-sm font-semibold text-text"
              >
                Postal code
                <span className="ml-2 text-xs font-normal text-text-muted">
                  Optional
                </span>
              </label>

              <input
                id="postalCode"
                name="postalCode"
                type="text"
                value={form.postalCode}
                onChange={handleChange}
                autoComplete="postal-code"
                inputMode="numeric"
                placeholder="Postal code"
                className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Landmark */}
            <div>
              <label
                htmlFor="landmark"
                className="text-sm font-semibold text-text"
              >
                Landmark
                <span className="ml-2 text-xs font-normal text-text-muted">
                  Optional
                </span>
              </label>

              <input
                id="landmark"
                name="landmark"
                type="text"
                value={form.landmark}
                onChange={handleChange}
                placeholder="Nearby landmark"
                className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          {/* Default */}
          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background px-4 py-3.5">
            <input
              name="isDefault"
              type="checkbox"
              checked={form.isDefault}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 accent-primary"
            />

            <span>
              <span className="block text-sm font-semibold text-text">
                Set as default address
              </span>

              <span className="mt-1 block text-xs leading-5 text-text-muted">
                Keep this address selected as your preferred
                saved address.
              </span>
            </span>
          </label>

          {/* Form Actions */}
          <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeForm}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <Save
                size={15}
                aria-hidden="true"
              />

              {editingId
                ? "Save Changes"
                : "Save Address"}
            </button>
          </div>
        </form>
      )}

      {/* Address List */}
      {!isFormOpen && addresses.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => {
            const Icon = getAddressIcon(
              address.label
            );

            return (
              <article
                key={address.id}
                className={[
                  "group flex h-full flex-col rounded-2xl border bg-surface p-5 transition-all duration-200 sm:p-6",
                  address.isDefault
                    ? "border-primary/25 shadow-sm"
                    : "border-border hover:border-primary/20 hover:shadow-sm",
                ].join(" ")}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-muted text-primary">
                      <Icon
                        size={18}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <h2 className="text-sm font-semibold text-text">
                        {address.label || "Address"}
                      </h2>

                      {address.isDefault && (
                        <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-success">
                          <Check
                            size={11}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                          Default
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openEditForm(address)
                    }
                    aria-label={`Edit ${address.label || "address"}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-primary/25 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <Pencil
                      size={15}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* Address Content */}
                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-sm font-semibold text-text">
                    {address.name}
                  </p>

                  <p className="mt-1.5 break-words text-sm text-text-muted">
                    {address.phone}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-text">
                    {address.address}
                    <br />
                    {address.area}
                    <br />
                    {address.city}
                    {address.postalCode
                      ? `, ${address.postalCode}`
                      : ""}
                  </p>

                  {address.landmark && (
                    <p className="mt-3 text-xs leading-5 text-text-muted">
                      <span className="font-semibold text-text">
                        Landmark:
                      </span>{" "}
                      {address.landmark}
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-auto flex flex-col gap-2 border-t border-border pt-5 sm:flex-row">
                  {!address.isDefault ? (
                    <button
                      type="button"
                      onClick={() =>
                        handleSetDefault(
                          address.id
                        )
                      }
                      className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-text transition-colors hover:border-primary/25 hover:bg-primary/[0.04] hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <Check
                        size={14}
                        aria-hidden="true"
                      />
                      Set as Default
                    </button>
                  ) : (
                    <div className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full bg-success/[0.06] px-4 py-2.5 text-xs font-semibold text-success">
                      Default address
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(address.id)
                    }
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-text-muted transition-colors hover:border-danger/20 hover:bg-danger/[0.04] hover:text-danger focus:outline-none focus:ring-2 focus:ring-danger/20 sm:w-auto"
                  >
                    <Trash2
                      size={14}
                      aria-hidden="true"
                    />
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isFormOpen && addresses.length === 0 && (
        <div className="mt-8 py-14 text-center sm:py-20">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary/10 bg-primary/[0.045] text-primary">
            <MapPin
              size={32}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>

          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            Delivery made easier
          </p>

          <h2 className="mt-3 font-heading text-2xl font-medium tracking-tight text-text sm:text-3xl">
            No saved addresses yet.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
            Add your delivery details once and keep them
            ready for future shopping.
          </p>

          <button
            type="button"
            onClick={openCreateForm}
            className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <Plus
              size={16}
              aria-hidden="true"
            />
            Add Your First Address
          </button>
        </div>
      )}

      {/* Demo Persistence Note */}
      <div className="mt-8 flex items-start gap-3 border-t border-border pt-5">
        <MapPin
          size={15}
          className="mt-0.5 shrink-0 text-text-muted"
          aria-hidden="true"
        />

        <p className="text-[11px] leading-5 text-text-muted">
          Address data in this frontend demo is stored
          locally in your browser. Production account
          persistence and server-side address validation will
          be connected with the backend later.
        </p>
      </div>
    </section>
  );
}

export default Addresses;