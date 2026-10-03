import { Hero } from "@/components/home/Hero";
import { AboutSnapshot } from "@/components/home/AboutSnapshot";
import { Industries } from "@/components/home/Industries";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Infrastructure } from "@/components/home/Infrastructure";
import { Certifications } from "@/components/home/Certifications";
import { Testimonials } from "@/components/home/Testimonials";
import { CTAStrip } from "@/components/home/CTAStrip";
import { ContactPreview } from "@/components/home/ContactPreview";
import { ContactMap } from "@/components/shared/ContactMap";

export default function Home() {
  return (
    <div className="relative w-full">
      {/* 1. Top Section: Hero (Pure original background, zero wave, protects Navbar) */}
      <Hero />

      {/* 2. Middle Content Sections */}
      <div className="relative w-full z-10 bg-[#F8FAFC] dark:bg-[#091A2E] transition-colors duration-500">
        <AboutSnapshot />
        <Industries />
        <ProductShowcase />
        <WhyChooseUs />
        <Infrastructure />
        <Certifications />
        <Testimonials />
        <CTAStrip />
        <ContactPreview />
      </div>

      {/* 3. Globe Section (<ContactMap />) - 100% Protected from any canvas or wave effect */}
      <div className="relative w-full z-30">
        <ContactMap />
      </div>
    </div>
  );
}
