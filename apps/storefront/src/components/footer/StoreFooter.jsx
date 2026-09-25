import {
  ArrowUpRight,
  Camera,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Shop", to: "/shop" },
  { label: "New In", to: "/shop?filter=new" },
  { label: "Collections", to: "/collections" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const customerLinks = [
  { label: "My Account", to: "/account" },
  { label: "Orders", to: "/account/orders" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Returns & Exchange", to: "/account/returns" },
];

function StoreFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-charcoal text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:py-18">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-10">
            <p className="font-heading text-2xl tracking-[0.08em]">
              BAJWA'S
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-[0.4em] text-white/50">
              Collection
            </p>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              Thoughtfully designed fashion for modern wardrobes, presented
              through a refined digital shopping experience powered by RANI.
            </p>

            <a
              href="#top"
              className="mt-7 inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
            >
              Back to top
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Explore */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Explore
            </h2>

            <nav className="mt-5 space-y-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block text-sm text-white/75 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Customer Care */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Customer Care
            </h2>

            <nav className="mt-5 space-y-3">
              {customerLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block text-sm text-white/75 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                to="/privacy"
                className="block text-sm text-white/75 transition hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="block text-sm text-white/75 transition hover:text-white"
              >
                Terms & Conditions
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Contact
            </h2>

            <div className="mt-5 space-y-4 text-sm text-white/70">
              <div className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>
                  Business address will be added before production.
                </span>
              </div>

              <div className="flex gap-3">
                <Phone size={18} className="shrink-0" />
                <span>+92 XXX XXXXXXX</span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} className="shrink-0" />
                <span>hello@bajwascollection.com</span>
              </div>

              <div className="flex gap-3">
                <Camera size={18} className="shrink-0" />
                <span>@bajwascollection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Bajwa's Collection. All rights
            reserved.
          </p>

          <p className="mt-2 sm:mt-0">Powered by RANI</p>
        </div>
      </div>
    </footer>
  );
}

export default StoreFooter;