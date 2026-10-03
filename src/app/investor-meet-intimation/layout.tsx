import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Meet Intimation | Market Engagement | J Pan Tubular Components Limited",
  description: "Official intimation of investor meetings, earnings calls, and conferences for J Pan Tubular Components Limited. Access verified market interactions and disclosures.",
};

export default function InvestorMeetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
