const collections = [
  {
    id: "collection-001",
    name: "New In",
    slug: "new-in",

    description:
      "Discover the latest arrivals from Bajwa's Collection, featuring fresh Pakistani eastern styles and contemporary seasonal pieces",

    shortDescription:
      "The latest arrivals, freshly curated for the season",

    image:
      "https://images.pexels.com/photos/36325924/pexels-photo-36325924.jpeg?auto=compress&cs=tinysrgb&w=1400",

    bannerImage:
      "https://images.pexels.com/photos/36325924/pexels-photo-36325924.jpeg?auto=compress&cs=tinysrgb&w=1800",

    status: "active",

    featured: true,

    sortOrder: 1,

    productSlugs: [
      "premium-kurta",
      "charcoal-shalwar-kameez",
      "embroidered-eastern-suit",
      "classic-printed-lawn",
      "ivory-eastern-shirt",
    ],

    tags: [
      "new-arrivals",
      "latest",
      "seasonal",
      "pakistani-fashion",
    ],
  },

  {
    id: "collection-002",
    name: "Signature",
    slug: "signature",

    description:
      "A refined selection of Bajwa's Collection essentials that balance traditional Pakistani character with contemporary design",

    shortDescription:
      "Timeless pieces that define the Bajwa's Collection aesthetic",

    image:
      "https://images.pexels.com/photos/35565657/pexels-photo-35565657.jpeg?auto=compress&cs=tinysrgb&w=1400",

    bannerImage:
      "https://images.pexels.com/photos/35562718/pexels-photo-35562718.jpeg?auto=compress&cs=tinysrgb&w=1800",

    status: "active",

    featured: true,

    sortOrder: 2,

    productSlugs: [
      "royal-white-kurta",
      "charcoal-shalwar-kameez",
      "signature-eastern-set",
      "embroidered-cotton-3-piece",
      "heritage-cotton-kurta",
    ],

    tags: [
      "signature",
      "essentials",
      "timeless",
      "premium",
    ],
  },

  {
    id: "collection-003",
    name: "Festive",
    slug: "festive",

    description:
      "Elevated Pakistani occasion wear created for festive gatherings, celebrations and memorable moments",

    shortDescription:
      "Elegant eastern pieces for festive occasions",

    image:
      "https://images.pexels.com/photos/31323178/pexels-photo-31323178.jpeg?auto=compress&cs=tinysrgb&w=1400",

    bannerImage:
      "https://images.pexels.com/photos/25184992/pexels-photo-25184992.jpeg?auto=compress&cs=tinysrgb&w=1800",

    status: "active",

    featured: true,

    sortOrder: 3,

    productSlugs: [
      "luxe-festive-ensemble",
      "midnight-kurta",
      "festive-printed-suit",
    ],

    tags: [
      "festive",
      "occasion-wear",
      "formal",
      "celebration",
    ],
  },

  {
    id: "collection-004",
    name: "Everyday Edit",
    slug: "everyday-edit",

    description:
      "Easy-to-wear Pakistani fashion designed for comfortable everyday styling without compromising on refinement",

    shortDescription:
      "Effortless pieces for everyday wardrobes",

    image:
      "https://images.pexels.com/photos/35562718/pexels-photo-35562718.jpeg?auto=compress&cs=tinysrgb&w=1400",

    bannerImage:
      "https://images.pexels.com/photos/36325924/pexels-photo-36325924.jpeg?auto=compress&cs=tinysrgb&w=1800",

    status: "active",

    featured: false,

    sortOrder: 4,

    productSlugs: [
      "premium-kurta",
      "royal-white-kurta",
      "signature-eastern-set",
      "ivory-eastern-shirt",
      "heritage-cotton-kurta",
    ],

    tags: [
      "everyday",
      "casual",
      "essentials",
      "comfort",
    ],
  },

  {
    id: "collection-005",
    name: "Eastern Classics",
    slug: "eastern-classics",

    description:
      "A curated selection inspired by timeless eastern silhouettes, familiar fabrics and enduring Pakistani style",

    shortDescription:
      "Classic eastern silhouettes with a modern perspective",

    image:
      "https://images.pexels.com/photos/31874432/pexels-photo-31874432.jpeg?auto=compress&cs=tinysrgb&w=1400",

    bannerImage:
      "https://images.pexels.com/photos/20777169/pexels-photo-20777169.jpeg?auto=compress&cs=tinysrgb&w=1800",

    status: "active",

    featured: false,

    sortOrder: 5,

    productSlugs: [
      "premium-kurta",
      "royal-white-kurta",
      "embroidered-eastern-suit",
      "signature-eastern-set",
      "classic-printed-lawn",
    ],

    tags: [
      "eastern",
      "classic",
      "traditional",
      "heritage",
    ],
  },
];

export function getCollectionBySlug(slug) {
  return collections.find(
    (collection) => collection.slug === slug
  );
}

export function getFeaturedCollections() {
  return collections.filter(
    (collection) => collection.featured
  );
}

export function getActiveCollections() {
  return collections.filter(
    (collection) => collection.status === "active"
  );
}

export function getCollectionProductSlugs(slug) {
  const collection = getCollectionBySlug(slug);

  return collection?.productSlugs ?? [];
}

export function searchCollections(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return collections;
  }

  return collections.filter((collection) => {
    const searchableText = [
      collection.name,
      collection.description,
      collection.shortDescription,
      ...collection.tags,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export default collections;