"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface MaterialDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentData: {
    title: string;
    type: string;
    date: string;
    ref: string;
    fiscal: string;
    summary?: string;
    link?: string;
  } | null;
}

export function MaterialDetailModal({ isOpen, onClose, documentData }: MaterialDetailModalProps) {
  if (!isOpen || !documentData) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        date: documentData.date,
        period: documentData.fiscal,
        particulars: `${documentData.title} (${documentData.type})`,
        link: documentData.link || "/sample-report.pdf",
      }}
    />
  );
}
