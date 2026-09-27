const categories = [
  {
    id: "cat-001",
    name: "Men",
    slug: "men",

    description:
      "Discover refined Pakistani menswear including kurtas, shalwar kameez and contemporary eastern essentials",

    shortDescription: "Modern Pakistani menswear for everyday and occasion wear",

    image:
      "https://images.pexels.com/photos/35562718/pexels-photo-35562718.jpeg?auto=compress&cs=tinysrgb&w=1200",

    bannerImage:
      "https://images.pexels.com/photos/35565657/pexels-photo-35565657.jpeg?auto=compress&cs=tinysrgb&w=1800",

    featured: true,

    sortOrder: 1,

    subcategories: [
      {
        name: "Kurtas",
        slug: "kurtas",
      },
      {
        name: "Shalwar Kameez",
        slug: "shalwar-kameez",
      },
      {
        name: "Eastern Shirts",
        slug: "eastern-shirts",
      },
    ],
  },

  {
    id: "cat-002",
    name: "Women",
    slug: "women",

    description:
      "Explore elegant Pakistani eastern wear featuring contemporary silhouettes, refined fabrics and seasonal detailing",

    shortDescription: "Elegant eastern wear for modern wardrobes",

    image:
      "https://images.pexels.com/photos/36325924/pexels-photo-36325924.jpeg?auto=compress&cs=tinysrgb&w=1200",

    bannerImage:
      "https://images.pexels.com/photos/20777169/pexels-photo-20777169.jpeg?auto=compress&cs=tinysrgb&w=1800",

    featured: true,

    sortOrder: 2,

    subcategories: [
      {
        name: "Eastern Suits",
        slug: "eastern-suits",
      },
      {
        name: "Embroidered",
        slug: "embroidered",
      },
      {
        name: "Festive",
        slug: "festive",
      },
    ],
  },

  {
    id: "cat-003",
    name: "Unstitched",
    slug: "unstitched",

    description:
      "Shop premium unstitched fabrics, prints and textures designed for your own eastern styling",

    shortDescription: "Premium fabrics designed your way",

    image:
      "https://images.pexels.com/photos/31874432/pexels-photo-31874432.jpeg?auto=compress&cs=tinysrgb&w=1200",

    bannerImage:
      "https://images.pexels.com/photos/31874432/pexels-photo-31874432.jpeg?auto=compress&cs=tinysrgb&w=1800",

    featured: true,

    sortOrder: 3,

    subcategories: [
      {
        name: "Printed",
        slug: "printed",
      },
      {
        name: "Embroidered",
        slug: "embroidered",
      },
      {
        name: "3 Piece",
        slug: "3-piece",
      },
    ],
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getFeaturedCategories() {
  return categories.filter((category) => category.featured);
}

export function getSubcategories(categorySlug) {
  const category = getCategoryBySlug(categorySlug);

  return category?.subcategories ?? [];
}

export function searchCategories(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return categories;
  }

  return categories.filter((category) => {
    const searchableText = [
      category.name,
      category.description,
      category.shortDescription,
      ...category.subcategories.map((subcategory) => subcategory.name),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export default categories;