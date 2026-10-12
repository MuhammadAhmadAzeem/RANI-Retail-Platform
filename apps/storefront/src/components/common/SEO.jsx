
import { Helmet } from "react-helmet-async";
import { matchPath, useLocation } from "react-router-dom";

import siteConfig, {
    getCanonicalUrl,
    getPageTitle,
} from "../../config/site";
import { getProductBySlug } from "../../data/mock/products";
import { getCategoryBySlug } from "../../data/mock/categories";
import { getCollectionBySlug } from "../../data/mock/collections";


function getPublicOrigin() {
    const candidate = siteConfig.site.url;

    if (!candidate) {
        return "";
    }

    try {
        const url = new URL(candidate);

        if (
            !["https:", "http:"].includes(url.protocol) ||
            url.username ||
            url.password
        ) {
            return "";
        }

        const hostname = url.hostname.toLowerCase();

        const isLocalHost =
            hostname === "localhost" ||
            hostname === "127.0.0.1" ||
            hostname === "0.0.0.0" ||
            hostname === "::1" ||
            hostname.endsWith(".localhost") ||
            hostname.endsWith(".local");

        const isPlaceholder =
            hostname === "example.com" ||
            hostname === "www.example.com" ||
            hostname.startsWith("your-domain.") ||
            /\.(example|invalid|test)$/i.test(hostname);

        if (isLocalHost || isPlaceholder) {
            return "";
        }

        return url.origin;
    } catch {
        return "";
    }
}


function getRouteMetadata(pathname) {
    if (pathname === "/") {
        return {
            description: siteConfig.seo.defaultDescription,
            noIndex: false,
            type: "website",
        };
    }

    if (pathname === "/shop") {
        return {
            title: "Shop Pakistani Fashion",
            description:
                "Explore Pakistani eastern wear, kurtas, shalwar kameez and seasonal styles from Bajwa's Collection.",
        };
    }

    if (pathname === "/collections") {
        return {
            title: "Fashion Collections",
            description:
                "Explore curated Pakistani fashion collections, contemporary eastern wear and seasonal pieces from Bajwa's Collection.",
        };
    }

    const categoryMatch = matchPath("/category/:slug", pathname);

    if (categoryMatch) {
        const category = getCategoryBySlug(categoryMatch.params.slug);

        if (!category) {
            return {
                title: "Category Not Found",
                description: "This product category could not be found.",
                noIndex: true,
            };
        }

        return {
            title: category.name,
            description: category.description,
            image: category.bannerImage || category.image,
        };
    }

    const collectionMatch = matchPath("/collection/:slug", pathname);

    if (collectionMatch) {
        const collection = getCollectionBySlug(collectionMatch.params.slug);

        if (!collection) {
            return {
                title: "Collection Not Found",
                description: "This fashion collection could not be found.",
                noIndex: true,
            };
        }

        return {
            title: collection.name,
            description: collection.description,
            image: collection.bannerImage || collection.image,
        };
    }

    const productMatch = matchPath("/product/:slug", pathname);

    if (productMatch) {
        const product = getProductBySlug(productMatch.params.slug);

        if (!product) {
            return {
                title: "Product Not Found",
                description: "This product could not be found.",
                noIndex: true,
            };
        }

        return {
            title: product.name,
            description: product.shortDescription || product.description,
            image: product.images?.[0],
            type: "product",
        };
    }

    const publicPages = {
        "/about": {
            title: "About Bajwa's Collection",
            description:
                "Discover Bajwa's Collection and its focus on contemporary Pakistani fashion and eastern wear.",
        },
        "/contact": {
            title: "Contact Bajwa's Collection",
            description:
                "Find contact information and customer support options for Bajwa's Collection.",
        },
    };

    if (publicPages[pathname]) {
        return publicPages[pathname];
    }

    if (pathname === "/privacy" || pathname === "/terms") {
        return {
            title: pathname === "/privacy" ? "Privacy Policy" : "Terms & Conditions",
            description:
                "Review the current development draft for Bajwa's Collection.",
            noIndex: true,
        };
    }

    const privatePages = {
        "/cart": "Shopping Bag",
        "/wishlist": "My Wishlist",
        "/checkout": "Checkout",
        "/checkout/payment": "Payment",
        "/checkout/success": "Order Confirmation",
        "/account": "My Account",
        "/account/login": "Customer Login",
        "/account/register": "Create Account",
        "/account/forgot-password": "Reset Password",
    };

    if (
        privatePages[pathname] ||
        pathname.startsWith("/account/") ||
        pathname.startsWith("/checkout/")
    ) {
        const title =
            privatePages[pathname] ||
            (pathname.startsWith("/account/")
                ? "Customer Account"
                : "Checkout");

        return {
            title,
            description: "Bajwa's Collection customer services.",
            noIndex: true,
        };
    }

    if (pathname === "/search") {
        return {
            title: "Search Products",
            description:
                "Search Pakistani fashion and eastern wear at Bajwa's Collection.",
            noIndex: true,
        };
    }

    return {
        title: "Page Not Found",
        description: "The requested page could not be found.",
        noIndex: true,
    };
}

function SEO({
    title,
    description,
    image,
    type,
    noIndex,
    canonicalPath,
    structuredData,
}) {
    const location = useLocation();

    const pathname =
        location.pathname.replace(/\/+$/, "") || "/";

    const routeMetadata = getRouteMetadata(pathname);

    const pageTitle =
        title ||
        (routeMetadata.title
            ? getPageTitle(routeMetadata.title)
            : siteConfig.seo.defaultTitle);

    const pageDescription = (
        description ||
        routeMetadata.description ||
        siteConfig.seo.defaultDescription
    )
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 160);

    const shouldNoIndex = noIndex ?? routeMetadata.noIndex ?? false;
    const pageType = type || routeMetadata.type || "website";
    const publicOrigin = getPublicOrigin();

    const requestedImage =
        image || routeMetadata.image || siteConfig.seo.ogImage;

    const imageOrigin =
        publicOrigin ||
        (typeof window !== "undefined" ? window.location.origin : "");

    let absoluteImage = "";

    try {
        if (/^https?:\/\//i.test(requestedImage)) {
            absoluteImage = requestedImage;
        } else if (imageOrigin && requestedImage) {
            absoluteImage = new URL(
                requestedImage,
                imageOrigin
            ).href;
        }
    } catch {
        absoluteImage = "";
    }

    const canonicalUrl =
        !shouldNoIndex && publicOrigin
            ? getCanonicalUrl(canonicalPath || pathname, publicOrigin)
            : "";

    const defaultSchema =
        pathname === "/" && publicOrigin
            ? {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: siteConfig.brand.name,
                url: `${publicOrigin}/`,
                description: siteConfig.seo.defaultDescription,
                inLanguage: "en-PK",
            }
            : null;

    const schema = structuredData || defaultSchema;

    return (
        <Helmet>
            <title>{pageTitle}</title>

            <meta name="description" content={pageDescription} />
            <meta
                name="robots"
                content={
                    shouldNoIndex ? "noindex, nofollow" : "index, follow"
                }
            />
            <meta name="theme-color" content="#6B1F2A" />

            <meta property="og:locale" content="en_PK" />
            <meta property="og:site_name" content={siteConfig.brand.name} />
            <meta property="og:type" content={pageType} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />

            {canonicalUrl && (
                <>
                    <link rel="canonical" href={canonicalUrl} />
                    <meta property="og:url" content={canonicalUrl} />
                </>
            )}

            {absoluteImage && (
                <>
                    <meta property="og:image" content={absoluteImage} />
                    <meta
                        property="og:image:alt"
                        content={`${siteConfig.brand.name} — Pakistani fashion`}
                    />
                    <meta
                        name="twitter:card"
                        content="summary_large_image"
                    />
                    <meta name="twitter:image" content={absoluteImage} />
                </>
            )}

            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />

            {schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
                    }}
                />
            )}
        </Helmet>
    );
}

export default SEO;
