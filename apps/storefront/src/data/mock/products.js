const products = [
  {
    id: "prod-001",
    slug: "premium-kurta",
    name: "Premium Classic Kurta",
    category: "Men",
    categorySlug: "men",
    collection: "New In",
    collectionSlug: "new-in",

    shortDescription: "A refined everyday kurta with a clean contemporary silhouette",

    description:
      "A timeless Pakistani kurta designed with a refined silhouette, comfortable fabric and understated detailing for everyday wear",

    price: 4999,
    compareAtPrice: 5999,
    currency: "PKR",

    sku: "BC-MEN-KUR-001",
    barcode: null,

    images: [
      "https://images.pexels.com/photos/35562718/pexels-photo-35562718.jpeg?auto=compress&cs=tinysrgb&w=1000",
      "https://images.pexels.com/photos/35565657/pexels-photo-35565657.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],

    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Ivory",
        value: "#F5F0E7",
      },
      {
        name: "Black",
        value: "#171717",
      },
    ],

    stock: 24,
    status: "active",
    availability: "in-stock",

    featured: true,
    newArrival: true,

    badge: "New In",

    tags: ["kurta", "menswear", "eastern-wear", "everyday"],

    material: "Premium cotton blend",
    fit: "Regular fit",

    care: [
      "Machine wash cold",
      "Wash with similar colors",
      "Do not bleach",
    ],
  },

  {
    id: "prod-002",
    slug: "royal-white-kurta",
    name: "Royal White Kurta",
    category: "Men",
    categorySlug: "men",
    collection: "Signature",
    collectionSlug: "signature",

    shortDescription: "A crisp traditional kurta for polished everyday styling",

    description:
      "A clean white kurta combining traditional Pakistani styling with a modern fit for versatile day to evening dressing",

    price: 4499,
    compareAtPrice: null,
    currency: "PKR",

    sku: "BC-MEN-KUR-002",
    barcode: null,

    images: [
      "https://images.pexels.com/photos/35565657/pexels-photo-35565657.jpeg?auto=compress&cs=tinysrgb&w=1000",
      "https://images.pexels.com/photos/35562718/pexels-photo-35562718.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],

    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "White",
        value: "#FFFFFF",
      },
    ],

    stock: 18,
    status: "active",
    availability: "in-stock",

    featured: true,
    newArrival: false,

    badge: "Signature",

    tags: ["kurta", "menswear", "white", "traditional"],

    material: "Premium lawn cotton",
    fit: "Regular fit",

    care: [
      "Machine wash cold",
      "Iron on low heat",
      "Wash with similar colors",
    ],
  },

  {
    id: "prod-003",
    slug: "charcoal-shalwar-kameez",
    name: "Charcoal Shalwar Kameez",
    category: "Men",
    categorySlug: "men",
    collection: "Signature",
    collectionSlug: "signature",

    shortDescription: "Classic charcoal tailoring with an effortless eastern profile",

    description:
      "A sophisticated charcoal shalwar kameez designed for a polished traditional look with comfortable everyday wearability",

    price: 6999,
    compareAtPrice: 7999,
    currency: "PKR",

    sku: "BC-MEN-SK-003",
    barcode: null,

    images: [
      "https://images.pexels.com/photos/35562718/pexels-photo-35562718.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],

    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      {
        name: "Charcoal",
        value: "#353535",
      },
    ],

    stock: 11,
    status: "active",
    availability: "in-stock",

    featured: false,
    newArrival: true,

    badge: "New In",

    tags: ["shalwar-kameez", "menswear", "charcoal", "premium"],

    material: "Premium blended fabric",
    fit: "Relaxed fit",

    care: [
      "Dry clean recommended",
      "Do not bleach",
      "Iron on low heat",
    ],
  },

  {
    id: "prod-004",
    slug: "embroidered-eastern-suit",
    name: "Embroidered Eastern Suit",
    category: "Women",
    categorySlug: "women",
    collection: "New In",
    collectionSlug: "new-in",

    shortDescription: "Elegant eastern wear with delicate embroidered detailing",

    description:
      "A graceful women's ensemble featuring refined eastern detailing, soft textures and an elegant silhouette for seasonal occasions",

    price: 7499,
    compareAtPrice: 8499,
    currency: "PKR",

    sku: "BC-WOM-SUIT-004",
    barcode: null,

    images: [
      "https://images.pexels.com/photos/36325924/pexels-photo-36325924.jpeg?auto=compress&cs=tinysrgb&w=1000",
      "https://images.pexels.com/photos/20777169/pexels-photo-20777169.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],

    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      {
        name: "Ivory",
        value: "#F5F0E7",
      },
      {
        name: "Burgundy",
        value: "#6B1F2A",
      },
    ],

    stock: 16,
    status: "active",
    availability: "in-stock",

    featured: true,
    newArrival: true,

    badge: "New In",

    tags: ["women", "eastern-wear", "embroidered", "seasonal"],

    material: "Premium blended fabric",
    fit: "Comfort fit",

    care: [
      "Hand wash recommended",
      "Do not bleach",
      "Iron on reverse side",
    ],
  },

  {
    id: "prod-005",
    slug: "signature-eastern-set",
    name: "Signature Eastern Set",
    category: "Women",
    categorySlug: "women",
    collection: "Signature",
    collectionSlug: "signature",

    shortDescription: "A versatile eastern set designed for effortless dressing",

    description:
      "A polished eastern set balancing traditional character with contemporary styling for everyday and semi-formal wear",

    price: 6999,
    compareAtPrice: null,
    currency: "PKR",

    sku: "BC-WOM-SET-005",
    barcode: null,

    images: [
      "https://images.pexels.com/photos/25184992/pexels-photo-25184992.jpeg?auto=compress&cs=tinysrgb&w=1000",
      "https://images.pexels.com/photos/36325924/pexels-photo-36325924.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],

    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      {
        name: "Sand",
        value: "#D8CBB8",
      },
      {
        name: "Black",
        value: "#171717",
      },
    ],

    stock: 21,
    status: "active",
    availability: "in-stock",

    featured: true,
    newArrival: false,

    badge: "Signature",

    tags: ["women", "eastern-set", "everyday", "signature"],

    material: "Soft cotton blend",
    fit: "Relaxed fit",

    care: [
      "Machine wash cold",
      "Wash inside out",
      "Do not bleach",
    ],
  },

  {
    id: "prod-006",
    slug: "luxe-festive-ensemble",
    name: "Luxe Festive Ensemble",
    category: "Women",
    categorySlug: "women",
    collection: "Festive",
    collectionSlug: "festive",

    shortDescription: "A statement eastern ensemble for elevated occasions",

    description:
      "A refined festive ensemble created for special occasions with elegant proportions, detailed textures and a sophisticated eastern aesthetic",

    price: 9999,
    compareAtPrice: 11499,
    currency: "PKR",

    sku: "BC-WOM-FES-006",
    barcode: null,

    images: [
      "https://images.pexels.com/photos/31323178/pexels-photo-31323178.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],

    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      {
        name: "Deep Burgundy",
        value: "#6B1F2A",
      },
      {
        name: "Ivory",
        value: "#F5F0E7",
      },
    ],

    stock: 8,
    status: "active",
    availability: "low-stock",

    featured: true,
    newArrival: true,

    badge: "Festive",

    tags: ["women", "festive", "formal", "premium"],

    material: "Premium textured fabric",
    fit: "Elegant relaxed fit",

    care: [
      "Dry clean recommended",
      "Store away from direct sunlight",
      "Iron on reverse side",
    ],
  },

  {
    id: "prod-007",
    slug: "classic-printed-lawn",
    name: "Classic Printed Lawn",
    category: "Unstitched",
    categorySlug: "unstitched",
    collection: "New In",
    collectionSlug: "new-in",

    shortDescription: "A versatile printed lawn fabric designed for your own styling",

    description:
      "A premium printed fabric selection offering an effortless base for custom eastern looks across the season",

    price: 3299,
    compareAtPrice: 3799,
    currency: "PKR",

    sku: "BC-UNS-LAW-007",
    barcode: null,

    images: [
      "https://images.pexels.com/photos/31874432/pexels-photo-31874432.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],

    sizes: ["3 Piece"],
    colors: [
      {
        name: "Ivory Print",
        value: "#EFE6D8",
      },
    ],

    stock: 32,
    status: "active",
    availability: "in-stock",

    featured: false,
    newArrival: true,

    badge: "New In",

    tags: ["unstitched", "lawn", "printed", "fabric"],

    material: "Premium lawn",
    fit: "Unstitched",

    care: [
      "Machine wash cold",
      "Wash with similar colors",
      "Iron on medium heat",
    ],
  },

  {
    id: "prod-008",
    slug: "embroidered-cotton-3-piece",
    name: "Embroidered Cotton 3-Piece",
    category: "Unstitched",
    categorySlug: "unstitched",
    collection: "Signature",
    collectionSlug: "signature",

    shortDescription: "A textured three-piece fabric set with subtle embroidery",

    description:
      "A sophisticated unstitched cotton set designed around subtle embroidery and versatile seasonal styling",

    price: 4999,
    compareAtPrice: null,
    currency: "PKR",

    sku: "BC-UNS-COT-008",
    barcode: null,

    images: [
      "https://images.pexels.com/photos/31874432/pexels-photo-31874432.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],

    sizes: ["3 Piece"],
    colors: [
      {
        name: "Warm Beige",
        value: "#D6C5AE",
      },
    ],

    stock: 14,
    status: "active",
    availability: "in-stock",

    featured: true,
    newArrival: false,

    badge: "Signature",

    tags: ["unstitched", "cotton", "embroidered", "three-piece"],

    material: "Premium cotton",
    fit: "Unstitched",

    care: [
      "Hand wash recommended",
      "Do not bleach",
      "Iron on reverse side",
    ],
  },

  {
    id: "prod-009",
    slug: "midnight-kurta",
    name: "Midnight Kurta",
    category: "Men",
    categorySlug: "men",
    collection: "Festive",
    collectionSlug: "festive",

    shortDescription: "A deep-toned kurta with a clean festive profile",

    description:
      "A sophisticated dark kurta built around traditional proportions and a refined finish for evening and festive dressing",

    price: 5499,
    compareAtPrice: 6499,
    currency: "PKR",

    sku: "BC-MEN-KUR-009",
    barcode: null,

    images: [
      "https://images.pexels.com/photos/35562718/pexels-photo-35562718.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],

    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Midnight",
        value: "#171717",
      },
    ],

    stock: 6,
    status: "active",
    availability: "low-stock",

    featured: false,
    newArrival: false,

    badge: "Limited",

    tags: ["men", "kurta", "festive", "evening"],

    material: "Premium blended fabric",
    fit: "Regular fit",

    care: [
      "Dry clean recommended",
      "Do not bleach",
      "Iron on low heat",
    ],
  },

  {
    id: "prod-010",
    slug: "ivory-eastern-shirt",
    name: "Ivory Eastern Shirt",
    category: "Women",
    categorySlug: "women",
    collection: "New In",
    collectionSlug: "new-in",

    shortDescription: "A soft ivory eastern shirt with effortless everyday appeal",

    description:
      "A clean eastern shirt designed in a soft ivory palette with understated detailing for versatile everyday styling",

    price: 4299,
    compareAtPrice: 4999,
    currency: "PKR",

    sku: "BC-WOM-SHT-010",
    barcode: null,

    images: [
      "https://images.pexels.com/photos/36325924/pexels-photo-36325924.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],

    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      {
        name: "Ivory",
        value: "#F5F0E7",
      },
    ],

    stock: 19,
    status: "active",
    availability: "in-stock",

    featured: false,
    newArrival: true,

    badge: "New In",

    tags: ["women", "shirt", "eastern", "ivory"],

    material: "Soft cotton blend",
    fit: "Comfort fit",

    care: [
      "Machine wash cold",
      "Wash inside out",
      "Iron on low heat",
    ],
  },

  {
    id: "prod-011",
    slug: "heritage-cotton-kurta",
    name: "Heritage Cotton Kurta",
    category: "Men",
    categorySlug: "men",
    collection: "Signature",
    collectionSlug: "signature",

    shortDescription: "Traditional character meets relaxed contemporary styling",

    description:
      "A versatile cotton kurta combining familiar Pakistani styling with a modern relaxed silhouette for everyday wear",

    price: 3999,
    compareAtPrice: null,
    currency: "PKR",

    sku: "BC-MEN-KUR-011",
    barcode: null,

    images: [
      "https://images.pexels.com/photos/35565657/pexels-photo-35565657.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],

    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      {
        name: "Stone",
        value: "#A99D8A",
      },
    ],

    stock: 27,
    status: "active",
    availability: "in-stock",

    featured: false,
    newArrival: false,

    badge: null,

    tags: ["men", "kurta", "cotton", "heritage"],

    material: "Cotton",
    fit: "Relaxed fit",

    care: [
      "Machine wash cold",
      "Wash with similar colors",
      "Iron on medium heat",
    ],
  },

  {
    id: "prod-012",
    slug: "festive-printed-suit",
    name: "Festive Printed Suit",
    category: "Women",
    categorySlug: "women",
    collection: "Festive",
    collectionSlug: "festive",

    shortDescription: "A graceful printed suit for festive gatherings",

    description:
      "A refined printed eastern suit designed to bring effortless color and elegant movement to festive wardrobes",

    price: 6499,
    compareAtPrice: 7499,
    currency: "PKR",

    sku: "BC-WOM-FES-012",
    barcode: null,

    images: [
      "https://images.pexels.com/photos/25184992/pexels-photo-25184992.jpeg?auto=compress&cs=tinysrgb&w=1000",
    ],

    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      {
        name: "Muted Rose",
        value: "#A88986",
      },
    ],

    stock: 9,
    status: "active",
    availability: "low-stock",

    featured: true,
    newArrival: false,

    badge: "Festive",

    tags: ["women", "printed", "festive", "eastern"],

    material: "Premium blended fabric",
    fit: "Comfort fit",

    care: [
      "Hand wash recommended",
      "Do not bleach",
      "Iron on reverse side",
    ],
  },
];

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug) {
  return products.filter(
    (product) => product.categorySlug === categorySlug
  );
}

export function getProductsByCollection(collectionSlug) {
  return products.filter(
    (product) => product.collectionSlug === collectionSlug
  );
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getNewArrivals() {
  return products.filter((product) => product.newArrival);
}

export function searchProducts(query) {
  const normalizedQuery = String(query ?? "").trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.slug,
      product.category,
      product.categorySlug,
      product.collection,
      product.collectionSlug,
      product.sku,
      product.shortDescription,
      product.description,
      ...(product.tags ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export default products;