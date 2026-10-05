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
import GridMotion from "@/components/ui/GridMotion";

import { ScrollRestoration } from "@/components/shared/ScrollRestoration";

export default function Home() {
  const gridItems = [
    'CNC', 'BRAZING', 'TOLERANCE', 'HELIUM', 'TESTING', 'CAPACITY', 'VACUUM',
    'OEM', 'TIER-1', 'BENDING', 'ROBOTIC', 'LASER', 'PRECISION', 'TUBULAR'
  ];

  return (
    <div className="relative w-full">
      <ScrollRestoration />
      {/* Global Fixed Background Grid (4 lines as requested) */}
      <div className="fixed inset-0 pointer-events-none flex justify-center items-center z-0 overflow-hidden">
        <GridMotion items={gridItems} gradientColor="transparent" />
      </div>

      {/* 1. Top Section: Hero (Pure original background, zero wave, protects Navbar) */}
      <div className="relative z-10 bg-[#FAFAFA] dark:bg-black">
        <Hero />
      </div>

      {/* 2. Middle Content Sections */}
      <div className="relative w-full z-10 bg-transparent transition-colors duration-500">
        
        {/* Top chunk with blur */}
        <div className="bg-[#F8FAFC]/90 dark:bg-[#091A2E]/90 backdrop-blur-md">
          <AboutSnapshot />
          <Industries />
          <ProductShowcase />
          <WhyChooseUs />
          <Infrastructure />
        </div>

        {/* Certifications - No backdrop-blur parent to allow sticky to work */}
        <div className="bg-[#F8FAFC]/90 dark:bg-[#091A2E]/90">
          <Certifications />
        </div>

        {/* Bottom chunk with blur */}
        <div className="bg-[#F8FAFC]/90 dark:bg-[#091A2E]/90 backdrop-blur-md">
          <Testimonials />
          <CTAStrip />
          <ContactPreview />
        </div>

      </div>

      {/* 3. Globe Section (<ContactMap />) - 100% Protected from any canvas or wave effect */}
      <div className="relative w-full z-30 bg-[#F8FAFC] dark:bg-[#091A2E]">
        <ContactMap />
      </div>
    </div>
  );
}
