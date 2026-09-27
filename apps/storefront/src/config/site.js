const siteConfig = {
  brand: {
    name: "Bajwa's Collection",
    shortName: "Bajwa's",
    platform: "RANI",
    tagline: "Contemporary Pakistani fashion for the modern wardrobe",
    description:
      "Bajwa's Collection presents refined Pakistani fashion, eastern wear and thoughtfully curated seasonal collections",
  },

  site: {
    name: "Bajwa's Collection",
    url: "http://localhost:5173",
    locale: "en-PK",
    language: "en",
    currency: "PKR",
    currencySymbol: "Rs.",
  },

  contact: {
    email: "hello@bajwascollection.com",
    phone: "+92 XXX XXXXXXX",
    address: "Business address will be added before production",
    instagram: "@bajwascollection",
  },

  navigation: [
    {
      label: "New In",
      href: "/shop?filter=new",
    },
    {
      label: "Men",
      href: "/category/men",
    },
    {
      label: "Women",
      href: "/category/women",
    },
    {
      label: "Collections",
      href: "/collections",
    },
    {
      label: "Sale",
      href: "/shop?filter=sale",
    },
  ],

  storefront: {
    defaultPageSize: 12,
    maxPageSize: 48,
    featuredProductLimit: 4,
    newArrivalLimit: 8,
    relatedProductLimit: 4,
  },

  seo: {
    defaultTitle: "Bajwa's Collection | Pakistani Fashion",
    titleTemplate: "%s | Bajwa's Collection",
    defaultDescription:
      "Shop refined Pakistani fashion, eastern wear, unstitched fabrics and seasonal collections from Bajwa's Collection",
    defaultKeywords: [
      "Pakistani fashion",
      "eastern wear",
      "shalwar kameez",
      "kurta",
      "unstitched",
      "Bajwa's Collection",
    ],
    ogImage: "/og-image.svg",
  },

  social: {
    instagram: "https://instagram.com/bajwascollection",
  },

  features: {
    wishlist: true,
    cart: true,
    checkout: true,
    customerAccount: true,
    reviews: true,
    search: true,
    returns: true,
    newsletter: true,
  },
};

export const getPageTitle = (title) => {
  if (!title) {
    return siteConfig.seo.defaultTitle;
  }

  return siteConfig.seo.titleTemplate.replace("%s", title);
};

export const getCanonicalUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return `${siteConfig.site.url}${normalizedPath}`;
};

export default siteConfig;