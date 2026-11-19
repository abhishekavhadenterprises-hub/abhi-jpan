"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface AnnualReturn {
  id?: number | string;
  year?: string;
  title?: string;
  date?: string;
  status?: string;
  auth?: string;
  link?: string;
}

interface AnnualReturnDetailModalProps {
  filing: AnnualReturn | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AnnualReturnDetailModal({ filing, isOpen, onClose }: AnnualReturnDetailModalProps) {
  if (!isOpen || !filing) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: filing.id,
        date: filing.date || filing.year,
        particulars: filing.title || "Annual Return (Form MGT-7)",
        link: filing.link || "/sample-report.pdf",
      }}
    />
  );
}
