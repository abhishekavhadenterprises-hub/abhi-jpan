import { designSpecService } from '../services/designSpecService';
import { getDefaultPinsForRoute, getAllDefaultSpecPayloads } from '../data/defaultPins';
import type { DesignPinAdapter, DesignSpecPin, CreateDesignPinPayload, UpdateDesignPinPayload } from '../types/designSpec.types';

const DEFAULT_PROJECT_KEY = process.env.NEXT_PUBLIC_PROJECT_KEY || 'jpan_portal';

/**
 * JPAN REST API Adapter for abhi-jpan.
 * Connects DesignPinOverlay to the backend database service.
 * Seamlessly merges existing database pins with all automated default specs.
 */
export const jpanApiAdapter: DesignPinAdapter & {
  seedDefaultSpecs: (routeKey?: string, projectKey?: string) => Promise<{ created: number; skipped: number; errors: number }>;
} = {
  async getPins(routeKey?: string, projectKey = DEFAULT_PROJECT_KEY): Promise<DesignSpecPin[]> {
    let apiPins: DesignSpecPin[] = [];
    try {
      const res = await designSpecService.getPins(routeKey, projectKey);
      if (res && res.data && Array.isArray(res.data)) {
        apiPins = res.data;
      }
    } catch (err) {
      console.warn('[jpanApiAdapter] Backend getPins error, serving local fallback specs:', err);
    }

    const defaultPins = getDefaultPinsForRoute(routeKey, projectKey);
    if (apiPins.length === 0) {
      return defaultPins;
    }

    // Merge: Preserve user's database pins, and append any missing default element specs
    const existingTitles = new Set(
      apiPins.map((p) => (p.title || '').trim().toLowerCase())
    );
    const existingSelectors = new Set(
      apiPins.map((p) => (p.selector || '').trim().toLowerCase())
    );

    const missingDefaults = defaultPins.filter((d) => {
      const titleMatch = existingTitles.has((d.title || '').trim().toLowerCase());
      const selectorMatch = d.selector && existingSelectors.has(d.selector.trim().toLowerCase());
      return !titleMatch && !selectorMatch;
    });

    return [...apiPins, ...missingDefaults];
  },

  async createPin(payload: CreateDesignPinPayload): Promise<DesignSpecPin> {
    const res = await designSpecService.createPin({
      projectKey: DEFAULT_PROJECT_KEY,
      ...payload,
    });
    return res.data;
  },

  async updatePin(
    pinId: string,
    payload: UpdateDesignPinPayload
  ): Promise<DesignSpecPin> {
    const res = await designSpecService.updatePin(pinId, payload);
    return res.data;
  },

  async approvePin(
    pinId: string,
    payload: { approvedByName: string; approvalNotes?: string }
  ): Promise<DesignSpecPin> {
    const res = await designSpecService.approvePin(pinId, payload);
    return res.data;
  },

  async requestChange(
    pinId: string,
    payload: { requestedBy: string; requestNotes: string; screenshotUrl?: string }
  ): Promise<DesignSpecPin> {
    const res = await designSpecService.requestChange(pinId, payload);
    return res.data;
  },

  async deletePin(pinId: string): Promise<{ id: string }> {
    const res = await designSpecService.deletePin(pinId);
    return res.data;
  },

  /**
   * Batch seeds default specifications for the current route directly into the database
   */
  async seedDefaultSpecs(routeKey?: string, projectKey = DEFAULT_PROJECT_KEY) {
    const allSpecs = getAllDefaultSpecPayloads();
    const cleanRoute = (routeKey || '').replace(/\/$/, '');
    const payloads = allSpecs.filter(
      (p) => !cleanRoute || p.routeKey.replace(/\/$/, '') === cleanRoute
    );
    return designSpecService.seedRouteSpecs(payloads.length > 0 ? payloads : allSpecs, projectKey);
  },
};

export default jpanApiAdapter;
