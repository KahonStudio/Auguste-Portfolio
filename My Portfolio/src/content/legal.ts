import type { LegalPage } from "@/types";

export const legalPages: LegalPage[] = [
  {
    slug: "terms",
    title: "Terms of Use",
    updatedAt: "2026-07-20",
    sections: [
      {
        heading: "Agreement",
        body: "By using this website, you agree to these terms. This site is operated by James Raphael Ibay as an individual. Content is provided for information, product discovery, and commission inquiries.",
      },
      {
        heading: "Products",
        body: "Digital products listed here are sold through itch.io or other linked storefronts. Purchases are subject to the storefront’s terms and the license notes provided for each product. I am not responsible for third-party platform outages or policy changes.",
      },
      {
        heading: "Commissions",
        body: "Commission work is governed by a written scope and agreement between you and me. Website forms are inquiries only and do not create a binding contract until terms are accepted in writing.",
      },
      {
        heading: "Intellectual property",
        body: "Unless otherwise stated, site design, writing, and original media on this website are owned by James Raphael Ibay. You may not reuse them without permission. Purchased product licenses are defined per product.",
      },
      {
        heading: "Limitation",
        body: "This site is provided as-is. To the extent permitted by law, I am not liable for indirect or consequential damages arising from use of the site or linked storefronts.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    updatedAt: "2026-07-20",
    sections: [
      {
        heading: "What I collect",
        body: "If you submit a contact or commission form, I receive the information you provide (such as name, email, and project details) so I can respond. Analytics may be added in the future; this policy will be updated accordingly.",
      },
      {
        heading: "How I use it",
        body: "Inquiry data is used only to evaluate and respond to your message, and to maintain records of professional correspondence. I do not sell your information.",
      },
      {
        heading: "Third parties",
        body: "Purchases on itch.io are handled by itch.io under their privacy policy. Email delivery providers (if configured) process message content solely to deliver mail.",
      },
      {
        heading: "Contact",
        body: "For privacy questions, contact me using the email listed on the Contact page.",
      },
    ],
  },
  {
    slug: "licenses",
    title: "Licenses",
    updatedAt: "2026-07-20",
    sections: [
      {
        heading: "Product licenses",
        body: "Each product page includes a license note. Unless a product states otherwise, purchases grant you rights described on that product’s itch.io page. Source redistribution, resale of assets, or claiming authorship of my work is not permitted without a written agreement.",
      },
      {
        heading: "Commission licenses",
        body: "Commission ownership and usage rights are defined in the project agreement before work begins. If you need exclusive rights, work-for-hire terms, or engine-specific grants, say so in the inquiry so the quote reflects that.",
      },
      {
        heading: "Site content",
        body: "Screenshots and stills on this site illustrate my work. They are not a license to use those assets in your projects unless you purchase the related product or commission equivalent work.",
      },
    ],
  },
];
