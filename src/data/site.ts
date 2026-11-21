/**
 * Central business configuration. Edit contact details, navigation and
 * headline copy here; every component reads from this file.
 */
export const site = {
  name: "Rajmomai Transport",
  tagline: "Moving Materials. Connecting Industries. Delivering Trust.",
  description:
    "Rajmomai Transport is an industrial transportation, logistics and raw-material supply business based in Bhavnagar, Gujarat, serving customers across Gujarat and India.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  yearsExperience: 16,
  location: {
    locality: "Bhavnagar",
    region: "Gujarat",
    country: "India",
    countryCode: "IN",
    label: "Bhavnagar, Gujarat, India",
  },
  email: "Mandeep210405@gmail.com",
  contacts: [
    {
      id: "mandeep",
      name: "Mandeep Jadeja",
      phone: "+91 9664967327",
      tel: "+919664967327",
      whatsapp: "919664967327",
    },
    {
      id: "kiritsinh",
      name: "Kiritsinh Jadeja",
      phone: "+91 9925125659",
      tel: "+919925125659",
      whatsapp: "919925125659",
    },
  ],
  /** Hero background. Replace with a real photo, e.g. "/images/hero.jpg". */
  heroImage: "/images/placeholders/hero.svg",
  nav: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Materials", href: "#materials" },
    { label: "Industries", href: "#industries" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
  copyright: "© 2026 Rajmomai Transport. All Rights Reserved.",
} as const;

export type Contact = (typeof site.contacts)[number];

export const whatsappLink = (number: string, text = "Hello Rajmomai Transport, I would like to discuss a requirement.") =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
