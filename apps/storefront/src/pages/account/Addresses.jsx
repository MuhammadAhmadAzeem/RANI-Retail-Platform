import {
  Check,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim()
    ) {
      return;
    }

    setAddresses((current) => [
      ...current,
      {
        id: Date.now(),
        ...form,
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        postalCode: form.postalCode.trim(),
        isDefault: current.length === 0,
      },
    ]);

    setForm({
      name: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    });

    setShowForm(false);
  };

  const handleRemove = (id) => {
    setAddresses((current) => {
      const remaining = current.filter(
        (address) => address.id !== id
      );

      if (
        remaining.length > 0 &&
        !remaining.some((address) => address.isDefault)
      ) {
        return remaining.map((address, index) => ({
          ...address,
          isDefault: index === 0,
        }));
      }

      return remaining;
    });
  };

  const handleSetDefault = (id) => {
    setAddresses((current) =>
      current.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  return (
    <main className="min-h-[70vh] bg-background">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            Account
          </p>

          <h1 className="mt-3 font-heading text-3xl font-medium text-text sm:text-4xl">
            Saved Addresses
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
            Save delivery addresses for a faster checkout
            experience.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">
            {addresses.length === 0
              ? "No saved addresses"
              : `${addresses.length} saved ${
                  addresses.length === 1
                    ? "address"
                    : "addresses"
                }`}
          </p>

          <button
            type="button"
            onClick={() => setShowForm((value) => !value)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <Plus size={16} aria-hidden="true" />
            {showForm ? "Close Form" : "Add Address"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-7"
          >
            <h2 className="font-heading text-2xl font-medium text-text">
              Add New Address
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-text"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-text"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                  className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="03XX XXXXXXX"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-text"
                >
                  Street address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  required
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="House, street, area"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-text"
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
                  required
                  className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="City"
                />
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="text-sm font-medium text-text"
                >
                  Postal code
                </label>

                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={form.postalCode}
                  onChange={handleChange}
                  autoComplete="postal-code"
                  className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Postal code"
                />
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-primary/30 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                Save Address
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 space-y-4">
          {addresses.length === 0 && !showForm && (
            <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted text-primary">
                <MapPin
                  size={28}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              <h2 className="mt-6 font-heading text-2xl font-medium text-text">
                No saved addresses
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted">
                Add a delivery address so you can use it
                during checkout.
              </p>
            </div>
          )}

          {addresses.map((address) => (
            <article
              key={address.id}
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-muted text-primary">
                    <MapPin size={19} aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-text">
                        {address.name}
                      </h2>

                      {address.isDefault && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-success">
                          <Check
                            size={12}
                            aria-hidden="true"
                          />
                          Default
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-text-muted">
                      {address.address}
                      <br />
                      {address.city}
                      {address.postalCode
                        ? `, ${address.postalCode}`
                        : ""}
                    </p>

                    <p className="mt-2 text-sm text-text-muted">
                      {address.phone}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={() =>
                        handleSetDefault(address.id)
                      }
                      className="min-h-10 rounded-full border border-border px-4 py-2 text-xs font-semibold text-text transition-colors hover:border-primary/30 hover:bg-surface-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      Set Default
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(address.id)
                    }
                    aria-label={`Remove address for ${address.name}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-danger/30 hover:bg-danger/5 hover:text-danger focus:outline-none focus:ring-2 focus:ring-danger/20"
                  >
                    <Trash2
                      size={16}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Addresses;