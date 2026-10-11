import PolicyPage from "../components/common/PolicyPage";

const privacySections = [
  {
    id: "notice",
    title: "About this privacy notice",
    paragraphs: [
      "This is a development draft for the Bajwa's Collection storefront, which is being built as part of the RANI retail platform. It is not a finalized production privacy policy.",
      "Before launch, the business must verify its actual data practices and have the final notice reviewed for the laws and obligations that apply to the business.",
    ],
  },
  {
    id: "information",
    title: "Information you provide",
    paragraphs: [
      "A live ecommerce service may need information such as a customer's name, email address, phone number, delivery address and order details to support purchases and customer service. The actual information collected must be confirmed against the features that are deployed.",
      "The current contact form prepares an email draft in the visitor's email application. It does not submit a contact request to a RANI server.",
    ],
  },
  {
    id: "accounts",
    title: "Accounts and order information",
    paragraphs: [
      "The storefront may include account, profile, wishlist, checkout, order and returns interfaces. Some of these features may use demonstration data or frontend-only state during development.",
      "Before launch, the privacy notice must explain what the live system stores, why it stores it, who can access it and how long applicable records are retained.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and browser storage",
    paragraphs: [
      "Cookies, local storage, session storage, analytics and other browser technologies must be audited before launch. This development draft does not claim that a complete technology audit has been performed.",
      "The published notice must explain which technologies are actually used, their purposes and applicable retention practices, along with any required consent and preference controls.",
    ],
  },
  {
    id: "payments",
    title: "Payments and third-party services",
    paragraphs: [
      "The actual payment, delivery, hosting, analytics and communication providers must be identified where they process customer information.",
      "Payment options displayed in a frontend demonstration do not prove that payment processing is active. Never enter real card details into a placeholder payment interface.",
    ],
  },
  {
    id: "security",
    title: "Information security and retention",
    paragraphs: [
      "The production system should apply appropriate safeguards and documented retention practices. The actual safeguards, access controls, incident procedures and retention periods must be verified before launch.",
      "This draft is not a security certification or a guarantee that every production security control is already implemented.",
    ],
  },
  {
    id: "rights",
    title: "Customer choices and privacy requests",
    paragraphs: [
      "The final policy should describe the privacy rights and choices available under the laws applicable to the business, explain how requests can be submitted, and provide verified contact details for privacy-related enquiries.",
      "The process for accessing, correcting or deleting information must reflect the actual capabilities and obligations of the live service.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this notice",
    paragraphs: [
      "The final policy should explain how material changes are communicated and how customers can find the latest version. It should be updated when the business's actual information practices change.",
    ],
  },
];

function Privacy() {
  return (
    <PolicyPage
      eyebrow="Your information"
      title="Privacy Policy"
      description="Learn about the privacy practices that Bajwa's Collection must explain as its online store moves from a frontend demonstration to a live service."
      sections={privacySections}
      draftNotice="Development draft — not a finalized legal policy. Verify the actual data flows, browser storage, service providers, retention practices and applicable requirements before publishing."
    />
  );
}

export default Privacy;