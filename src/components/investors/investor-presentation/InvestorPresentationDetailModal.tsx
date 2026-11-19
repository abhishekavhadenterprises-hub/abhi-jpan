"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface PresentationItem {
  id?: number | string;
  title: string;
  date: string;
  summary?: string;
  type?: string;
  link?: string;
}

interface InvestorPresentationDetailModalProps {
  presentation: PresentationItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvestorPresentationDetailModal({ presentation, isOpen, onClose }: InvestorPresentationDetailModalProps) {
  if (!isOpen || !presentation) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: presentation.id,
        date: presentation.date,
        particulars: presentation.title,
        link: presentation.link || "/sample-report.pdf",
      }}
    />
  );
}
