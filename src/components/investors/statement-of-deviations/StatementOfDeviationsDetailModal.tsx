"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface StatementItem {
  id?: number | string;
  period?: string;
  title: string;
  date: string;
  desc?: string;
  status?: string;
  link?: string;
}

interface StatementOfDeviationsDetailModalProps {
  statement: StatementItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StatementOfDeviationsDetailModal({ statement, isOpen, onClose }: StatementOfDeviationsDetailModalProps) {
  if (!isOpen || !statement) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: statement.id,
        date: statement.date || statement.period,
        particulars: statement.title,
        link: statement.link || "/sample-report.pdf",
      }}
    />
  );
}
