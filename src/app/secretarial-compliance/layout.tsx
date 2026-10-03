import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secretarial Compliance Report | Governance | J Pan Tubular Components Limited",
  description: "Official secretarial compliance reports for J Pan Tubular Components Limited. Access annual audit records, governance transparency reports, and regulatory adherence documentation.",
};

export default function SecretarialComplianceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
