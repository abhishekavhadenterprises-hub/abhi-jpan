import { Metadata } from "next";

export const metadata: Metadata = {
  title: "General Meeting Notices | Shareholder Hub | J Pan Tubular Components Limited",
  description: "Official shareholder meeting notices and proclamations for J Pan Tubular Components Limited's AGM and EGM. Access verified meeting records and participation guidelines.",
};

export default function GeneralMeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
