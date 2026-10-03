import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Presentation | Strategic Insights | J Pan Tubular Components Limited",
  description: "Explore J Pan Tubular Components Limited's strategic growth narratives. Access detailed business insights, quarterly presentations, and capital allocation roadmaps.",
};

export default function InvestorPresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
