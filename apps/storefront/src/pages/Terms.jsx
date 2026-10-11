import PolicyPage from "../components/common/PolicyPage";

const termsSections = [
  {
    id: "status",
    title: "Status of these terms",
    paragraphs: [
      "These Terms & Conditions are a development draft for the Bajwa's Collection storefront. They are not a finalized production agreement.",
      "Before the store accepts live orders, the business must approve terms that match its operations and applicable legal requirements.",
    ],
  },
  {
    id: "products",
    title: "Products and availability",
    paragraphs: [
      "The storefront is designed for Pakistani fashion, including eastern wear, unstitched fabrics and seasonal collections. Product descriptions, photographs, sizes, colours, prices and availability should be checked against the actual products offered.",
      "Demonstration product data may not represent current stock or a final offer to sell. The production terms should explain how listing mistakes and product discrepancies will be handled.",
    ],
  },
  {
    id: "orders",
    title: "Orders and confirmation",
    paragraphs: [
      "The development storefront may display sample order flows or frontend-only order records. A demonstration screen is not proof that a real purchase has been accepted, paid for or fulfilled.",
      "Before launch, the business must define the actual order submission and confirmation process, stock checks, cancellation rules and customer notifications.",
    ],
  },
  {
    id: "payment",
    title: "Payments",
    paragraphs: [
      "A payment option shown in the interface does not establish that a payment provider is connected. The live store must clearly state which methods are available and explain relevant authorization, failed payment, cancellation and refund procedures.",
      "Never enter real card data in an unconnected or placeholder payment form. Actual payment processing must be implemented and tested through an appropriate provider.",
    ],
  },
  {
    id: "delivery",
    title: "Shipping and delivery",
    paragraphs: [
      "The production policy must state verified delivery coverage, shipping charges, estimated delivery windows and the procedure for delayed, unsuccessful or returned deliveries.",
      "This draft does not establish a specific shipping fee, delivery deadline or delivery guarantee.",
    ],
  },
  {
    id: "returns",
    title: "Returns, exchanges and refunds",
    paragraphs: [
      "The business must publish an approved policy explaining eligible products, request deadlines, product-condition requirements, the return or exchange process and how refunds are handled.",
      "This draft does not establish a specific return window or guarantee a refund or exchange. The final policy must be reviewed before customers place live orders.",
    ],
  },
  {
    id: "accounts",
    title: "Customer accounts",
    paragraphs: [
      "Frontend account screens do not, on their own, provide production-grade identity verification or account security. The deployed service must implement and explain the account controls it actually supports.",
      "The final terms should document relevant customer responsibilities and account recovery procedures without suggesting that a demo authentication flow is a production security boundary.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable website use",
    paragraphs: [
      "Visitors should not attempt unauthorized access, disrupt the service or misuse the website. The final terms should define any additional restrictions and their consequences in language that has been reviewed for the applicable business and legal context.",
    ],
  },
  {
    id: "changes",
    title: "Updates to these terms",
    paragraphs: [
      "The production terms should explain how revisions are published, when they take effect and how customers will be informed when necessary. The effective date and final approved wording must be supplied before launch.",
    ],
  },
];

function Terms() {
  return (
    <PolicyPage
      eyebrow="Shopping information"
      title="Terms & Conditions"
      description="Understand the policies that must be confirmed before Bajwa's Collection begins accepting and fulfilling live online orders."
      sections={termsSections}
      draftNotice="Development draft — not finalized legal terms. Confirm order, payment, delivery, refund and other business policies, and arrange appropriate review before publishing."
    />
  );
}

export default Terms;