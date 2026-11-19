"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface Transcript {
  id?: number | string;
  title: string;
  date: string;
  type?: string;
  fiscal?: string;
  quarter?: string;
  link?: string;
}

interface TranscriptDetailModalProps {
  transcript: Transcript | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TranscriptDetailModal({ transcript, isOpen, onClose }: TranscriptDetailModalProps) {
  if (!isOpen || !transcript) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: transcript.id,
        date: transcript.date,
        particulars: transcript.title,
        link: transcript.link || "/sample-report.pdf",
      }}
    />
  );
}
