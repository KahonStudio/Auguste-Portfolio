import type { LegalPage } from "@/types";

export const legalPages: LegalPage[] = [
  {
    slug: "terms",
    title: "Terms of Use",
    updatedAt: "2026-07-20",
    sections: [
      {
        heading: "Agreement",
        body: "By using this website, you agree to these terms. This site is operated by James Raphael Ibay as an individual. Content is provided for information, portfolio showcase, and commission inquiries.",
      },
      {
        heading: "Third-party downloads",
        body: "Some projects link to free downloads on itch.io or other platforms. Those downloads are subject to the host platform’s terms. I am not responsible for third-party platform outages or policy changes.",
      },
      {
        heading: "Commissions",
        body: "Commission work is governed by a written scope and agreement between you and me. Website forms are inquiries only and do not create a binding contract until terms are accepted in writing.",
      },
      {
        heading: "Intellectual property",
        body: "Unless otherwise stated, site design, writing, and original media on this website are owned by James Raphael Ibay. You may not reuse them without permission. Licenses for itch.io releases are defined on each itch.io page.",
      },
      {
        heading: "Limitation",
        body: "This site is provided as-is. To the extent permitted by law, I am not liable for indirect or consequential damages arising from use of the site or linked third-party platforms.",
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
        body: "Downloads and activity on itch.io are handled by itch.io under their privacy policy. Email delivery providers (if configured) process message content solely to deliver mail.",
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
        heading: "itch.io releases",
        body: "Free downloads on itch.io follow the license notes on each itch.io page. Source redistribution, resale of assets, or claiming authorship of my work is not permitted without a written agreement.",
      },
      {
        heading: "Commission licenses",
        body: "Commission ownership and usage rights are defined in the project agreement before work begins. If you need exclusive rights, work-for-hire terms, or engine-specific grants, say so in the inquiry so the quote reflects that.",
      },
      {
        heading: "Site content",
        body: "Screenshots and stills on this site illustrate my work. They are not a license to use those assets in your projects unless you download a related release under its itch.io license or commission equivalent work.",
      },
    ],
  },
];
