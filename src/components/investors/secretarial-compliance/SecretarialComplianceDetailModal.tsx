"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface ReportItem {
  id?: number | string;
  fy?: string;
  title: string;
  date: string;
  desc?: string;
  status?: string;
  link?: string;
}

interface SecretarialComplianceDetailModalProps {
  report: ReportItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SecretarialComplianceDetailModal({ report, isOpen, onClose }: SecretarialComplianceDetailModalProps) {
  if (!isOpen || !report) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: report.id,
        date: report.date || report.fy,
        particulars: report.title,
        link: report.link || "/sample-report.pdf",
      }}
    />
  );
}
