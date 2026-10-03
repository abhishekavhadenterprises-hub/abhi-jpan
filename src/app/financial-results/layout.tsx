import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Results & Performance | J Pan Tubular Components Limited",
  description: "Explore J Pan Tubular Components Limited's financial performance, quarterly disclosures, and annual reports. Our commitment to transparency and investor accountability.",
};

export default function FinancialResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
