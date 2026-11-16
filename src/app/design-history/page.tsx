import { Suspense } from "react";
import { DesignHistoryAuditPage } from "@/features/design-spec/pages/DesignHistoryAuditPage";

export const metadata = {
  title: "Design Specs & Audit History | J Pan Components",
  description: "Chronological audit trail of element pins, user comments, and client approvals",
};

export default function DesignHistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
        </div>
      }
    >
      <DesignHistoryAuditPage />
    </Suspense>
  );
}
