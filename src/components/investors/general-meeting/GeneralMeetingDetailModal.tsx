"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface GeneralMeetingNotice {
  id?: number | string;
  type?: string;
  title: string;
  date: string;
  desc?: string;
  status?: string;
  link?: string;
}

interface GeneralMeetingDetailModalProps {
  notice: GeneralMeetingNotice | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GeneralMeetingDetailModal({ notice, isOpen, onClose }: GeneralMeetingDetailModalProps) {
  if (!isOpen || !notice) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: notice.id,
        date: notice.date,
        particulars: notice.title,
        link: notice.link || "/sample-report.pdf",
      }}
    />
  );
}
