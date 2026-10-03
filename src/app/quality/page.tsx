import { QualityHero } from "@/components/quality/QualityHero";
import { QualityCommitment } from "@/components/quality/QualityCommitment";
import { QualityCertifications } from "@/components/quality/QualityCertifications";
import { QualityProcess } from "@/components/quality/QualityProcess";
import { TestingFacilities } from "@/components/quality/TestingFacilities";
import { QualityCompliance } from "@/components/quality/QualityCompliance";
import { QualityImprovement } from "@/components/quality/QualityImprovement";
import { QualityTrust } from "@/components/quality/QualityTrust";
import { Achievements } from "@/components/quality/Achievements";

export const metadata = {
  title: "Certifications & Quality | J Pan Tubular Components Limited",
  description: "Explore the rigorous quality standards and international certifications that define J Pan Tubular Components Limited's manufacturing excellence.",
};

export default function QualityPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-black">
      <QualityHero />
      <QualityCommitment />
      <QualityCertifications />
      <QualityProcess />
      <TestingFacilities />
      <Achievements />
      <QualityCompliance />
      <QualityImprovement />
      <QualityTrust />
    </main>
  );
}
