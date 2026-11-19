"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface AnnualReport {
  id?: number;
  year?: string;
  date?: string;
  title?: string;
  particulars?: string;
  desc?: string;
  link?: string;
}

interface AnnualReportsDetailModalProps {
  report: AnnualReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AnnualReportsDetailModal({ report, isOpen, onClose }: AnnualReportsDetailModalProps) {
  if (!isOpen || !report) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: report.id,
        date: report.date || report.year,
        particulars: report.particulars || report.title || "Annual Statutory Report",
        link: report.link || "/sample-report.pdf",
      }}
    />
  );
}
