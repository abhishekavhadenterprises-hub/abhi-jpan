"use client";

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { DesignPinOverlay } from './DesignPinOverlay';
import { createLocalStorageAdapter } from '../adapters/localStorageAdapter';

/**
 * JPan Portal wrapper for the reusable DesignPinOverlay.
 * Automatically injects the active Next.js App Router pathname, localStorage adapter,
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

  const adapter = useMemo(() => {
    return createLocalStorageAdapter('jpan_portal');
  }, []);

  const currentRoute = pathname || '/';

  return (
    <DesignPinOverlay
      projectKey="jpan_portal"
      currentRoute={currentRoute}
      adapter={adapter}
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
