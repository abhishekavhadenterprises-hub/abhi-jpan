"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface Publication {
  id?: number | string;
  title: string;
  newspaper?: string;
  date: string;
  language?: string;
  category?: string;
  link?: string;
}

interface PublicationDetailModalProps {
  publication: Publication | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PublicationDetailModal({ publication, isOpen, onClose }: PublicationDetailModalProps) {
  if (!isOpen || !publication) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: publication.id,
        date: publication.date,
        particulars: publication.title,
        link: publication.link || "/sample-report.pdf",
      }}
    />
  );
}
