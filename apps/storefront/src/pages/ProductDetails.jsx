import {
  ArrowLeft,
  Check,
  Heart,
  ShieldCheck,
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

  // Track the main Add to Bag area and the variant selector.
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

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  // Show the sticky CTA only after the main CTA has passed above
  // the viewport. Keep it hidden while the main CTA is visible
  // or is still further down the page.
  useEffect(() => {
    const target = mainAddToBagContainerRef.current;

    if (
      !target ||
      typeof IntersectionObserver === "undefined"
    ) {
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
      {
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [product?.id]);

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/10 bg-surface text-primary shadow-sm">
              <ShoppingBag size={24} aria-hidden="true" />
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.24em] text-primary sm:text-[11px]">
              Product not found
            </p>

            <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-text sm:text-5xl">
              We couldn&apos;t find this product
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-text-muted">
              The product may have been removed or the link may no longer be
              available.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20"
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
    if (isSoldOut) {
      return;
    }

    if (sizes.length > 0 && !selectedSize) {
      variantSelectorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }

    addToCart(
      product,
      quantity,
      selectedSize,
      selectedColor
    );
  };

  const handleWishlistToggle = () => {
    if (!product) {
      return;
    }

    toggleWishlist(product);
  };

  const handleSizeGuide = () => {
    setIsSizeGuideOpen(true);
  };

  return (
    <>
      <main
        className={`min-h-screen bg-background ${
          !isSoldOut ? "pb-24 lg:pb-0" : ""
        }`}
      >
        {/* =========================================================
            PRODUCT HERO
        ========================================================= */}
        <section className="mx-auto max-w-7xl px-4 pb-14 pt-5 sm:px-6 sm:pb-16 sm:pt-6 lg:px-8 lg:pb-20 lg:pt-10 xl:pb-24">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              {
                label: "Shop",
                href: "/shop",
              },
              {
                label: product.name,
              },
            ]}
          />

          {/* Back To Shop */}
          <div className="mt-5 sm:mt-6 lg:mt-8">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted transition hover:border-primary/30 hover:bg-background hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-[11px]"
            >
              <ArrowLeft
                size={14}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />

              Back to shop
            </Link>
          </div>

          {/* Product Layout */}
          <div className="mt-7 grid gap-8 md:gap-10 lg:mt-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12 xl:grid-cols-[1.08fr_0.92fr] xl:gap-16">
            {/* =====================================================
                LEFT: GALLERY
            ===================================================== */}
            <div className="min-w-0">
              <ProductGallery
                images={images}
                productName={product.name}
                badge={product.badge}
              />
            </div>

            {/* =====================================================
                RIGHT: PRODUCT INFORMATION
            ===================================================== */}
            <div className="min-w-0 lg:pt-1">
              <div className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-sm sm:rounded-[1.75rem] sm:p-7 lg:p-8">
                {/* Product Heading */}
                <div className="flex items-start justify-between gap-4 sm:gap-5">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary sm:text-[11px]">
                      {product.category}
                    </p>

                    <h1 className="mt-2.5 max-w-2xl font-serif text-3xl font-medium leading-[1.1] tracking-tight text-text sm:mt-3 sm:text-4xl xl:text-[2.7rem]">
                      {product.name}
                    </h1>
                  </div>

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={handleWishlistToggle}
                    aria-label={
                      isWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    aria-pressed={isWishlisted}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-200 sm:h-11 sm:w-11 ${
                      isWishlisted
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-background text-text hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={isWishlisted ? "currentColor" : "none"}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* Price + Stock */}
                <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3">
                  <Price
                    price={product.price}
                    compareAtPrice={product.compareAtPrice}
                    priceClassName="text-2xl font-semibold sm:text-[1.65rem]"
                  />

                  {isLowStock && (
                    <span className="rounded-full border border-warning/20 bg-warning/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-warning">
                      Low stock
                    </span>
                  )}

                  {isSoldOut && (
                    <span className="rounded-full border border-danger/20 bg-danger/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-danger">
                      Sold out
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mt-6 border-y border-border py-5 sm:mt-7 sm:py-6">
                  <p className="text-sm leading-7 text-text-muted">
                    {product.description}
                  </p>
                </div>

                {/* =================================================
                    VARIANT SELECTOR
                ================================================= */}
                <div
                  ref={variantSelectorRef}
                  className="mt-6 sm:mt-7"
                >
                  <ProductVariantSelector
                    sizes={sizes}
                    colors={colors}
                    selectedSize={selectedSize}
                    selectedColor={selectedColor}
                    onSizeChange={setSelectedSize}
                    onColorChange={setSelectedColor}
                    onSizeGuide={handleSizeGuide}
                  />
                </div>

                {/* =================================================
                    MAIN ADD TO BAG
                ================================================= */}
                <div ref={mainAddToBagContainerRef}>
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

                {/* =================================================
                    PRODUCT DETAILS
                ================================================= */}
                <div className="mt-7 overflow-hidden rounded-2xl border border-border bg-background sm:mt-8">
                  {product.material && (
                    <DetailRow
                      label="Material"
                      value={product.material}
                    />
                  )}

                  {product.fit && (
                    <DetailRow
                      label="Fit"
                      value={product.fit}
                    />
                  )}

                  {product.sku && (
                    <DetailRow
                      label="SKU"
                      value={product.sku}
                    />
                  )}
                </div>

                {/* =================================================
                    TRUST INFORMATION
                ================================================= */}
                <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-4">
                  <TrustItem
                    icon={ShieldCheck}
                    title="Quality focused"
                    description="Thoughtfully selected fabrics and refined finishing."
                  />

                  <TrustItem
                    icon={ShoppingBag}
                    title="Easy shopping"
                    description="A simple and focused buying experience."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PRODUCT CARE
        ========================================================= */}
        {Array.isArray(product.care) && product.care.length > 0 && (
          <section className="border-y border-primary/10 bg-linear-to-br from-primary/[0.10] to-[#F7F3EC]">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:py-24">
              {/* Care Header */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface/80 px-3.5 py-1.5 shadow-sm backdrop-blur-sm">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-[#B08D57]"
                  />

                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                    Product care
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
                  Care instructions
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-text-muted">
                  Simple care practices to help preserve the fabric, finish, and
                  overall quality of your piece.
                </p>
              </div>

              {/* Care Grid */}
              <div className="mt-8 grid gap-4 sm:mt-9 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
                {product.care.map((item, index) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-surface/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md sm:p-6"
                  >
                    {/* Burgundy Decorative Shape */}
                    <div
                      aria-hidden="true"
                      className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/[0.06] transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Gold Decorative Shape */}
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-[#B08D57]/[0.05]"
                    />

                    <div className="relative">
                      {/* Number + Icon */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-primary">
                          <Check
                            size={17}
                            strokeWidth={2.25}
                            aria-hidden="true"
                          />
                        </div>

                        <span className="rounded-full bg-primary/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Care Text */}
                      <p className="mt-5 text-sm leading-7 text-text sm:text-[15px]">
                        {item}
                      </p>

                      {/* Gold Accent */}
                      <div className="mt-5 h-px w-10 bg-[#B08D57] transition-all duration-300 group-hover:w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            RELATED PRODUCTS
        ========================================================= */}
        {relatedProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary sm:text-[11px]">
                  You may also like
                </p>

                <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
                  More from {product.category}
                </h2>

                <p className="mt-3 text-sm leading-6 text-text-muted">
                  Explore more pieces from the same category.
                </p>
              </div>

              <Link
                to={`/category/${product.categorySlug}`}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary transition hover:border-primary/30 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-[11px]"
              >
                View all

                <ArrowLeft
                  size={14}
                  aria-hidden="true"
                  className="rotate-180"
                />
              </Link>
            </div>

            <div className="mt-8 sm:mt-9">
              <ProductGrid products={relatedProducts} />
            </div>
          </section>
        )}
      </main>

      {/* ===========================================================
          MOBILE STICKY ADD TO CART
          Show only after the main Add to Bag area is scrolled above
          the viewport. Keep the same selected size and quantity.
      =========================================================== */}
      {!isMainAddToBagVisible && (
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

      {/* ===========================================================
          SIZE GUIDE
      =========================================================== */}
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
    <div className="flex min-h-[58px] items-center justify-between gap-5 border-b border-border px-4 py-4 last:border-b-0 sm:px-5">
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
        {label}
      </span>

      <span className="max-w-[60%] text-right text-sm font-medium text-text">
        {value}
      </span>
    </div>
  );
}

function TrustItem({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon
            size={17}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-text">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-text-muted">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;