"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface FinancialReport {
  id?: number | string;
  title: string;
  period?: string;
  date?: string;
  type?: string;
  status?: string;
  link?: string;
}

interface FinancialDetailModalProps {
  report: FinancialReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FinancialDetailModal({ report, isOpen, onClose }: FinancialDetailModalProps) {
  if (!isOpen || !report) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: report.id,
        date: report.date || report.period,
        particulars: report.title,
        link: report.link || "/sample-report.pdf",
      }}
    />
  );
}
