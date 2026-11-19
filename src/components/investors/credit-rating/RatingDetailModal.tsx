"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

interface RatingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ratingData: {
    rating: string;
    agency: string;
    date: string;
    outlook: string;
    ref: string;
  } | null;
}

export function RatingDetailModal({ isOpen, onClose, ratingData }: RatingDetailModalProps) {
  if (!isOpen || !ratingData) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        date: ratingData.date,
        particulars: `${ratingData.agency} Credit Rating Rationale — ${ratingData.rating} (${ratingData.outlook})`,
        link: "/sample-report.pdf",
      }}
    />
  );
}
