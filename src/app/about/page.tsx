import { AboutHero } from "@/components/about/AboutHero";
import { OurStory } from "@/components/about/OurStory";
import { CompanyOverview } from "@/components/about/CompanyOverview";
import { VisionMission } from "@/components/about/VisionMission";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { Leadership } from "@/components/about/Leadership";
import { AboutManufacturing } from "@/components/about/AboutManufacturing";
import { AboutQuality } from "@/components/about/AboutQuality";
import { AboutPresence } from "@/components/about/AboutPresence";
import { AboutWhyChooseUs } from "@/components/about/AboutWhyChooseUs";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata = {
  title: "About Us | J Pan Tubular Components Limited",
  description: "Learn about the heritage, vision, and manufacturing excellence of J Pan Tubular Components Limited. Precision engineering since 1998.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <CompanyOverview />
      <VisionMission />
      <JourneyTimeline />
      <Leadership />
      <AboutManufacturing />
      <AboutQuality />
      <AboutPresence />
      <AboutWhyChooseUs />
      <AboutCTA />
    </>
  );
}
