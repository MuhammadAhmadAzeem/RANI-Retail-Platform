
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import Breadcrumbs from "../components/common/Breadcrumbs";
import Price from "../components/common/Price";
import AddToBag from "../components/ecommerce/AddToBag";
import ProductGallery from "../components/ecommerce/ProductGallery";
import ProductGrid from "../components/ecommerce/ProductGrid";
import ProductVariantSelector from "../components/ecommerce/ProductVariantSelector";
import SizeGuide from "../components/ecommerce/SizeGuide";
import StickyAddToCart from "../components/ecommerce/StickyAddToCart";
import useProducts from "../hooks/useProducts";
import useWishlistStore from "../store/wishlistStore";
import useCartStore from "../store/cartStore";

function ProductDetails() {
  const { slug } = useParams();
  const { getProductBySlug, allProducts } = useProducts();
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.name || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMainAddToBagVisible, setIsMainAddToBagVisible] =
    useState(true);

  const mainAddToBagContainerRef = useRef(null);
  const variantSelectorRef = useRef(null);

  const isWishlisted = useWishlistStore((state) =>
    state.items.some((item) => item.id === product?.id)
  );

  const toggleWishlist = useWishlistStore(
    (state) => state.toggleWishlist
  );

  const addToCart = useCartStore((state) => state.addToCart);

  // Reset selections when navigating directly between products.
  useEffect(() => {
    setSelectedSize("");
    setSelectedColor(product?.colors?.[0]?.name || "");
    setQuantity(1);
    setIsSizeGuideOpen(false);
    setIsMainAddToBagVisible(true);
  }, [product?.id]);

  // Keep the mobile purchase bar hidden until the main CTA
  // has scrolled above the viewport.
  useEffect(() => {
    const target = mainAddToBagContainerRef.current;

    if (!target || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hasPassedAboveViewport =
          entry.boundingClientRect.bottom < 0;

        setIsMainAddToBagVisible(
          entry.isIntersecting || !hasPassedAboveViewport
        );
      },
      { threshold: 0 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [product?.id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return allProducts
      .filter(
        (item) =>
          item.id !== product.id &&
          item.categorySlug === product.categorySlug
      )
      .slice(0, 4);
  }, [allProducts, product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-16 text-center sm:px-6">
          <div className="w-full">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/10 bg-surface text-primary">
              <ShoppingBag size={24} aria-hidden="true" />
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
              Product not found
            </p>

            <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-text sm:text-5xl">
              We couldn&apos;t find this product
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-text-muted">
              The product may have been removed or the link may no
              longer be available.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Back to shop
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const images = Array.isArray(product.images) ? product.images : [];
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const colors = Array.isArray(product.colors) ? product.colors : [];
  const stock = Number(product.stock) || 0;

  const isSoldOut =
    product.availability === "out-of-stock" || stock <= 0;

  const isLowStock =
    !isSoldOut &&
    (product.availability === "low-stock" || stock <= 5);

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(stock || 1, current + 1));
  };

  const handleAddToBag = () => {
    if (isSoldOut) return;

    if (sizes.length > 0 && !selectedSize) {
      variantSelectorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  return (
    <>
      <main
        className={`min-h-screen bg-[#F7F3EC] ${
          !isSoldOut ? "pb-24 lg:pb-0" : ""
        }`}
      >
        {/* PRODUCT HERO */}
        <section className="mx-auto max-w-[1480px] px-4 pb-12 pt-5 sm:px-6 sm:pb-16 sm:pt-7 lg:px-10 lg:pb-20 lg:pt-8 xl:px-14">
          <Breadcrumbs
            items={[
              { label: "Shop", href: "/shop" },
              { label: product.name },
            ]}
          />

          <div className="mt-5 flex items-center justify-between border-b border-border pb-4">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 text-xs font-medium text-text-muted transition hover:text-primary"
            >
              <ArrowLeft
                size={15}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-1"
              />
              Continue shopping
            </Link>

            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted sm:inline">
              Bajwa&apos;s Collection
            </span>
          </div>

          {/* BALANCED TWO-COLUMN LAYOUT */}
          <div className="mt-6 grid items-start gap-6 md:mt-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(350px,0.78fr)] lg:gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(370px,0.8fr)] xl:gap-12">
            {/* LEFT: PRODUCT GALLERY */}
            <div className="min-w-0">
              <ProductGallery
                images={images}
                productName={product.name}
                badge={product.badge}
              />

              <div className="mt-5 hidden items-center justify-between border-t border-border pt-4 lg:flex">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-text-muted">
                  Considered details. Timeless style.
                </p>
                <span className="h-px w-12 bg-[#B08D57]" />
              </div>
            </div>

            {/* RIGHT: PRODUCT PURCHASE INFORMATION */}
            <div className="min-w-0 rounded-2xl border border-[#E9E1D7] bg-white p-5 shadow-[0_8px_30px_rgba(60,35,25,0.04)] sm:p-7 xl:sticky xl:top-24 xl:p-8">
              <div className="border-b border-border pb-5 sm:pb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
                      {product.category}
                    </p>

                    <h1 className="mt-3 font-serif text-[1.75rem] font-medium leading-[1.16] tracking-tight text-[#302521] sm:text-3xl xl:text-[2.35rem]">
                      {product.name}
                    </h1>
                  </div>

                  <button
                    type="button"
                    onClick={handleWishlistToggle}
                    aria-label={
                      isWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    aria-pressed={isWishlisted}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${
                      isWishlisted
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-surface text-text hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Heart
                      size={19}
                      fill={isWishlisted ? "currentColor" : "none"}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Price
                    price={product.price}
                    compareAtPrice={product.compareAtPrice}
                    priceClassName="text-2xl font-semibold tracking-tight sm:text-[1.7rem]"
                  />

                  {isLowStock && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1.5 text-[10px] font-semibold text-warning">
                      <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                      Only {stock} left
                    </span>
                  )}

                  {isSoldOut && (
                    <span className="rounded-full bg-danger/10 px-3 py-1.5 text-[10px] font-semibold text-danger">
                      Currently unavailable
                    </span>
                  )}
                </div>

                {product.sku && (
                  <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-text-muted">
                    Product code: {product.sku}
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              {product.description && (
                <div className="border-b border-border py-5 sm:py-6">
                  <p className="text-[13px] leading-6 text-[#776B64] sm:text-sm sm:leading-7">
                    {product.description}
                  </p>
                </div>
              )}

              {/* VARIANTS */}
              <div
                ref={variantSelectorRef}
                className="border-b border-border py-5 sm:py-6"
              >
                <ProductVariantSelector
                  sizes={sizes}
                  colors={colors}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  onSizeChange={setSelectedSize}
                  onColorChange={setSelectedColor}
                  onSizeGuide={() => setIsSizeGuideOpen(true)}
                />
              </div>

              {/* PURCHASE AREA */}
              <div
                ref={mainAddToBagContainerRef}
                className="pt-5 sm:pt-6"
              >
                <AddToBag
                  quantity={quantity}
                  stock={stock}
                  isSoldOut={isSoldOut}
                  requiresSize={sizes.length > 0}
                  selectedSize={selectedSize}
                  onDecrease={decreaseQuantity}
                  onIncrease={increaseQuantity}
                  onAddToBag={handleAddToBag}
                />
              </div>
              {/* COLLAPSIBLE PRODUCT DETAILS */}
              {(product.material || product.fit) && (
                <div className="mt-4 border-b border-border">
                  <button
                    type="button"
                    onClick={() => setIsDetailsOpen((open) => !open)}
                    aria-expanded={isDetailsOpen}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-text">
                      Product details
                    </span>
                    <ChevronDown
                      size={17}
                      aria-hidden="true"
                      className={`shrink-0 text-text-muted transition-transform duration-200 ${
                        isDetailsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDetailsOpen && (
                    <div className="divide-y divide-border pb-2">
                      {product.material && (
                        <DetailRow
                          label="Fabric / Material"
                          value={product.material}
                        />
                      )}
                      {product.fit && (
                        <DetailRow label="Fit" value={product.fit} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CARE INSTRUCTIONS */}
        {Array.isArray(product.care) && product.care.length > 0 && (
          <section className="border-y border-primary/10 bg-linear-to-br from-primary/[0.06] to-[#F7F3EC]">
            <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 xl:px-14">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                    Made to be cherished
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-medium text-text sm:text-4xl">
                    Product care
                  </h2>
                </div>

                <p className="max-w-md text-sm leading-6 text-text-muted">
                  Follow the care guidance provided for your selected piece.
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {product.care.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-start gap-4 rounded-lg border border-primary/10 bg-surface p-4 transition hover:border-primary/25"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check size={17} aria-hidden="true" />
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted">
                        Care tip {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-2 text-sm leading-6 text-text">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                  Complete your edit
                </p>

                <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-text sm:text-4xl">
                  More to discover
                </h2>

                <p className="mt-3 text-sm leading-6 text-text-muted">
                  Explore other pieces from {product.category}.
                </p>
              </div>

              <Link
                to={`/category/${product.categorySlug}`}
                className="inline-flex w-fit items-center gap-2 border-b border-primary/30 pb-2 text-xs font-semibold text-primary transition hover:border-primary"
              >
                Explore collection
                <ArrowLeft
                  size={14}
                  className="rotate-180"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="mt-8 sm:mt-10">
              <ProductGrid products={relatedProducts} />
            </div>
          </section>
        )}
      </main>

      {/* MOBILE STICKY PURCHASE BAR */}
      {!isMainAddToBagVisible && !isSoldOut && (
        <StickyAddToCart
          productName={product.name}
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          isSoldOut={isSoldOut}
          requiresSize={sizes.length > 0}
          selectedSize={selectedSize}
          onAddToBag={handleAddToBag}
        />
      )}

      <SizeGuide
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        sizes={sizes}
      />
    </>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-5 py-3.5">
      <span className="text-xs text-text-muted">{label}</span>
      <span className="text-right text-sm font-medium text-text">
        {value}
      </span>
    </div>
  );
}

function TrustLine({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
        <Icon size={16} aria-hidden="true" />
      </span>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-text">{title}</p>
        <p className="mt-1 text-xs leading-5 text-text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
