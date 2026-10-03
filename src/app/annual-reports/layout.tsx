import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Annual Corporate Reports | J Pan Tubular Components Limited",
  description: "Access J Pan Tubular Components Limited's annual performance and strategic reports. Explore our year-on-year growth, technical milestones, and fiscal responsibility.",
};

export default function AnnualReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
