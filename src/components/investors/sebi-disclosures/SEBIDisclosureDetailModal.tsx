"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

export interface DisclosureItem {
  id: number;
  reg: string;
  title: string;
  date: string;
  desc: string;
  status: string;
  link?: string;
}

interface SEBIDisclosureDetailModalProps {
  disclosure: DisclosureItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SEBIDisclosureDetailModal({ disclosure, isOpen, onClose }: SEBIDisclosureDetailModalProps) {
  if (!isOpen || !disclosure) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: disclosure.id,
        date: disclosure.date,
        particulars: `${disclosure.reg} — ${disclosure.title}`,
        link: disclosure.link || "/sample-report.pdf",
      }}
    />
  );
}
