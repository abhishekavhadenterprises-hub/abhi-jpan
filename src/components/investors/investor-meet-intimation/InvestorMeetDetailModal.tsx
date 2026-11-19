"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface InvestorInteraction {
  id?: number | string;
  type?: string;
  title: string;
  date: string;
  desc?: string;
  link?: string;
}

interface InvestorMeetDetailModalProps {
  item: InvestorInteraction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvestorMeetDetailModal({ item, isOpen, onClose }: InvestorMeetDetailModalProps) {
  if (!isOpen || !item) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: item.id,
        date: item.date,
        particulars: item.title,
        link: item.link || "/sample-report.pdf",
      }}
    />
  );
}
