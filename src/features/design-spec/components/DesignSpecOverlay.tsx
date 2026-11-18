"use client";

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { DesignPinOverlay } from './DesignPinOverlay';
import { jpanApiAdapter } from '../adapters/jpanApiAdapter';

const PROJECT_KEY = process.env.NEXT_PUBLIC_PROJECT_KEY || 'jpan_portal';

/**
 * JPan Portal wrapper for the reusable DesignPinOverlay.
 * Automatically injects the active Next.js App Router pathname, jpanApiAdapter with DB sync,
 * user identity, and toast notifications.
 */
export const DesignSpecOverlay: React.FC = () => {
  const pathname = usePathname();

  const currentUser = useMemo(() => {
    return {
      name: 'Admin',
      role: 'Corporate Admin',
    };
  }, []);

  const currentRoute = pathname || '/';

  return (
    <DesignPinOverlay
      projectKey={PROJECT_KEY}
      currentRoute={currentRoute}
      adapter={jpanApiAdapter}
      currentUser={currentUser}
      onNotify={(type, msg) => {
        if (type === 'error') {
          toast.error(msg);
        } else if (type === 'info') {
          toast.info(msg);
        } else {
          toast.success(msg);
        }
      }}
    />
  );
};

export default DesignSpecOverlay;
