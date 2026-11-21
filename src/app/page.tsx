import About from "@/components/About";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Industries from "@/components/Industries";
import Materials from "@/components/Materials";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import WhyChoose from "@/components/WhyChoose";
import { site } from "@/data/site";

// Local business structured data: only verified details from src/data/site.ts.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.contacts[0].tel,
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.locality,
    addressRegion: site.location.region,
    addressCountry: site.location.countryCode,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Gujarat" },
    { "@type": "Country", name: "India" },
  ],
  contactPoint: site.contacts.map((c) => ({
    "@type": "ContactPoint",
    name: c.name,
    telephone: c.tel,
    contactType: "sales",
    availableLanguage: ["English", "Hindi", "Gujarati"],
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Materials />
        <Industries />
        <Clients />
        <WhyChoose />
        <Stats />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
