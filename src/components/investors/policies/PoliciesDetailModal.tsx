"use client";

import React from "react";
import { GenericDocumentModal } from "@/components/investors/shared/GenericInvestorComponents";

export interface Policy {
  id?: number;
  title: string;
  category: string;
  description: string;
  lastUpdated?: string;
  access?: string;
  link?: string;
}

interface PoliciesDetailModalProps {
  policy: Policy | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PoliciesDetailModal({ policy, isOpen, onClose }: PoliciesDetailModalProps) {
  if (!isOpen || !policy) return null;

  return (
    <GenericDocumentModal
      isOpen={isOpen}
      onClose={onClose}
      item={{
        id: policy.id,
        date: policy.lastUpdated || "Statutory Policy",
        particulars: policy.title,
        link: policy.link || "/sample-report.pdf",
      }}
    />
  );
}
