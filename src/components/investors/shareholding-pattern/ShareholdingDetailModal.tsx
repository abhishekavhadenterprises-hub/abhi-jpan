"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface Report {
  id?: number | string;
  title: string;
  period?: string;
  date?: string;
  status?: string;
  link?: string;
}

interface ShareholdingDetailModalProps {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareholdingDetailModal({ report, isOpen, onClose }: ShareholdingDetailModalProps) {
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
