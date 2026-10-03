import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Annual Return | Statutory Filings | J Pan Tubular Components Limited",
  description: "Official statutory filings and annual return documents for J Pan Tubular Components Limited. Access verified regulatory data and fiscal accountability records.",
};

export default function AnnualReturnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
