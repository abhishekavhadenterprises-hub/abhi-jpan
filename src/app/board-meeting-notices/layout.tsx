import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board Meeting Notices | Executive Governance | J Pan Tubular Components Limited",
  description: "Official board meeting notices and resolutions for J Pan Tubular Components Limited. Access verified executive proclamations and strategic agendas.",
};

export default function BoardMeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
