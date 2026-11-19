"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface BoardNotice {
  id?: number | string;
  title?: string;
  date?: string;
  agenda?: string;
  status?: string;
  link?: string;
}

interface BoardMeetingDetailModalProps {
  notice: BoardNotice | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BoardMeetingDetailModal({ notice, isOpen, onClose }: BoardMeetingDetailModalProps) {
  if (!isOpen || !notice) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: notice.id,
        date: notice.date,
        particulars: notice.title || "Notice of Board Meeting",
        link: notice.link || "/sample-report.pdf",
      }}
    />
  );
}
