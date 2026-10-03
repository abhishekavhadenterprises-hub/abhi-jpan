import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEBI Disclosures | Regulatory Compliance | J Pan Tubular Components Limited",
  description: "Official statutory disclosures for J Pan Tubular Components Limited as per SEBI (LODR) Regulations. Access verified regulatory filings and material event intimations.",
};

export default function SEBIDisclosuresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
