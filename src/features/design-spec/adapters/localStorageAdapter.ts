import type {
  DesignPinAdapter,
  DesignSpecPin,
  CreateDesignPinPayload,
  UpdateDesignPinPayload,
  DesignPinChangeRequest,
} from '../types/designSpec.types';
import { getDefaultPinsForRoute, ALL_DEFAULT_PINS } from '../data/defaultPins';

const STORAGE_PREFIX = 'design_spec_pins_';
const AUDIT_STORAGE_PREFIX = 'design_spec_audit_logs_';

/**
 * Standalone LocalStorage adapter for DesignPinOverlay.
 * Enables zero-backend, 100% frontend persistent storage for design specs,
 * approvals, and change request audit history.
 */
export const createLocalStorageAdapter = (
  projectKey = 'jpan_portal'
): DesignPinAdapter & {
  getAllPins: () => Promise<DesignSpecPin[]>;
  getAuditLogs: () => Promise<DesignPinChangeRequest[]>;
} => {
  const getKey = () => `${STORAGE_PREFIX}${projectKey}`;
  const getAuditKey = () => `${AUDIT_STORAGE_PREFIX}${projectKey}`;

  const readStorage = (): DesignSpecPin[] => {
    if (typeof window === 'undefined') return ALL_DEFAULT_PINS;
    try {
      const raw = localStorage.getItem(getKey());
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      writeStorage(ALL_DEFAULT_PINS);
      return ALL_DEFAULT_PINS;
    } catch (e) {
      console.warn('Failed to parse design pins from localStorage', e);
      return ALL_DEFAULT_PINS;
    }
  };

  const writeStorage = (pins: DesignSpecPin[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(getKey(), JSON.stringify(pins));
    } catch (e) {
      console.warn('Failed to save design pins to localStorage', e);
    }
  };

  const readAuditLogs = (): DesignPinChangeRequest[] => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(getAuditKey());
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse audit logs from localStorage', e);
    }
    return [];
  };

  const appendAuditLog = (log: DesignPinChangeRequest) => {
    if (typeof window === 'undefined') return;
    try {
      const current = readAuditLogs();
      const updated = [log, ...current];
      localStorage.setItem(getAuditKey(), JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to append audit log to localStorage', e);
    }
  };

  return {
    async getPins(routeKey?: string): Promise<DesignSpecPin[]> {
      const allPins = readStorage();
      if (!routeKey) return allPins;

      const normalized = routeKey.replace(/\/$/, '') || '/';
      const baseRoute = normalized.split('?')[0];

      const matching = allPins.filter((p) => {
        const pRoute = (p.route_key || '').replace(/\/$/, '') || '/';
        const pBase = pRoute.split('?')[0];
        return pRoute === normalized || pBase === baseRoute;
      });

      if (matching.length === 0) {
        return getDefaultPinsForRoute(routeKey, projectKey);
      }

      return matching;
    },

    async getAllPins(): Promise<DesignSpecPin[]> {
      return readStorage();
    },

    async getAuditLogs(): Promise<DesignPinChangeRequest[]> {
      const stored = readAuditLogs();
      if (stored.length > 0) return stored;

      const seedLogs: DesignPinChangeRequest[] = ALL_DEFAULT_PINS.map((p) => ({
        id: `audit_seed_${p.id}`,
        pin_id: p.id,
        requested_by: p.approved_by_name || p.feature_owner_name || 'System Admin',
        request_notes: p.approval_notes || `Initial specification approved for ${p.title}`,
        previous_status: 'pending_approval',
        record_type: 'approved',
        created_at: p.approved_at || p.created_at,
        pin_title: p.title,
        pin_description: p.description,
        pin_how_it_works: p.how_it_works,
        feature_owner_name: p.feature_owner_name,
        route_key: p.route_key,
        module_name: p.module_name || undefined,
        sub_module_name: p.sub_module_name || undefined,
        screen_name: p.screen_name || undefined,
        component_name: p.component_name || undefined,
        element_tag: p.element_tag,
        element_text: p.element_text,
      }));

      return seedLogs;
    },

    async createPin(payload: CreateDesignPinPayload): Promise<DesignSpecPin> {
      const pins = readStorage();
      const now = new Date().toISOString();
      const newPin: DesignSpecPin = {
        id: `pin_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        project_key: payload.projectKey || projectKey,
        route_key: payload.routeKey,
        module_name: payload.moduleName || null,
        sub_module_name: payload.subModuleName || null,
        screen_name: payload.screenName || null,
        component_name: payload.componentName || null,
        screenshot_url: payload.screenshotUrl || null,
        selector: payload.selector || 'body',
        element_tag: payload.elementTag,
        element_text: payload.elementText,
        bounding_rect: {
          top: payload.boundingRect?.top ?? payload.boundingRect?.y ?? 0,
          left: payload.boundingRect?.left ?? payload.boundingRect?.x ?? 0,
          width: payload.boundingRect?.width ?? 0,
          height: payload.boundingRect?.height ?? 0,
        },
        title: payload.title,
        description: payload.description || (payload.goal ? `Goal: ${payload.goal}` : ''),
        how_it_works: payload.howItWorks,
        feature_owner_name: payload.featureOwnerName,
        feature_owner_role: payload.featureOwnerRole || 'Feature Owner',
        status: 'pending_approval',
        approved_by_name: null,
        approved_at: null,
        approval_notes: null,
        agreement_hash: null,
        change_request_count: 0,
        last_change_requested_at: null,
        created_at: now,
        updated_at: now,
        changeRequests: [],
        mentions: payload.mentions || [],
      };

      const updated = [newPin, ...pins];
      writeStorage(updated);

      appendAuditLog({
        id: `audit_create_${Date.now()}`,
        pin_id: newPin.id,
        requested_by: newPin.feature_owner_name,
        request_notes: `Created new element specification: ${newPin.title}`,
        previous_status: 'none',
        record_type: 'spec_created',
        created_at: now,
        pin_title: newPin.title,
        pin_description: newPin.description,
        pin_how_it_works: newPin.how_it_works,
        feature_owner_name: newPin.feature_owner_name,
        route_key: newPin.route_key,
        module_name: newPin.module_name || undefined,
        screen_name: newPin.screen_name || undefined,
        component_name: newPin.component_name || undefined,
        element_tag: newPin.element_tag,
        element_text: newPin.element_text,
      });

      return newPin;
    },

    async updatePin(pinId: string, payload: UpdateDesignPinPayload): Promise<DesignSpecPin> {
      const pins = readStorage();
      const idx = pins.findIndex((p) => p.id === pinId);
      if (idx === -1) throw new Error('Pin not found in LocalStorage');

      const existing = pins[idx];
      const now = new Date().toISOString();
      const updatedPin: DesignSpecPin = {
        ...existing,
        title: payload.title ?? existing.title,
        description: payload.description ?? existing.description,
        how_it_works: payload.howItWorks ?? existing.how_it_works,
        feature_owner_name: payload.featureOwnerName ?? existing.feature_owner_name,
        updated_at: now,
      };

      pins[idx] = updatedPin;
      writeStorage(pins);

      appendAuditLog({
        id: `audit_update_${Date.now()}`,
        pin_id: pinId,
        requested_by: updatedPin.feature_owner_name,
        request_notes: `Updated specification details for: ${updatedPin.title}`,
        previous_status: existing.status,
        record_type: 'spec_updated',
        created_at: now,
        pin_title: updatedPin.title,
        route_key: updatedPin.route_key,
        module_name: updatedPin.module_name || undefined,
        screen_name: updatedPin.screen_name || undefined,
      });

      return updatedPin;
    },

    async approvePin(
      pinId: string,
      payload: { approvedByName: string; approvalNotes?: string }
    ): Promise<DesignSpecPin> {
      const pins = readStorage();
      const idx = pins.findIndex((p) => p.id === pinId);
      if (idx === -1) throw new Error('Pin not found in LocalStorage');

      const now = new Date().toISOString();
      const pin = pins[idx];
      const agreementHash = `sha256_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

      const updatedPin: DesignSpecPin = {
        ...pin,
        status: 'approved',
        approved_by_name: payload.approvedByName,
        approved_at: now,
        approval_notes: payload.approvalNotes || null,
        agreement_hash: agreementHash,
        updated_at: now,
      };

      pins[idx] = updatedPin;
      writeStorage(pins);

      appendAuditLog({
        id: `audit_approve_${Date.now()}`,
        pin_id: pinId,
        requested_by: payload.approvedByName,
        request_notes: payload.approvalNotes || 'Specification approved and signed off',
        previous_status: pin.status,
        record_type: 'approved',
        created_at: now,
        pin_title: pin.title,
        route_key: pin.route_key,
        module_name: pin.module_name || undefined,
        screen_name: pin.screen_name || undefined,
      });

      return updatedPin;
    },

    async requestChange(
      pinId: string,
      payload: { requestedBy: string; requestNotes: string; screenshotUrl?: string }
    ): Promise<DesignSpecPin> {
      const pins = readStorage();
      const idx = pins.findIndex((p) => p.id === pinId);
      if (idx === -1) throw new Error('Pin not found in LocalStorage');

      const now = new Date().toISOString();
      const pin = pins[idx];
      const newCount = (pin.change_request_count || 0) + 1;

      const changeReq: DesignPinChangeRequest = {
        id: `cr_${Date.now()}`,
        pin_id: pinId,
        requested_by: payload.requestedBy,
        request_notes: payload.requestNotes,
        previous_status: pin.status,
        record_type: 'change_requested',
        screenshot_url: payload.screenshotUrl || null,
        created_at: now,
        pin_title: pin.title,
        route_key: pin.route_key,
        module_name: pin.module_name || undefined,
        screen_name: pin.screen_name || undefined,
      };

      const updatedPin: DesignSpecPin = {
        ...pin,
        status: 'changes_requested',
        change_request_count: newCount,
        last_change_requested_at: now,
        updated_at: now,
        changeRequests: [changeReq, ...(pin.changeRequests || [])],
      };

      pins[idx] = updatedPin;
      writeStorage(pins);
      appendAuditLog(changeReq);

      return updatedPin;
    },

    async deletePin(pinId: string): Promise<{ id: string }> {
      const pins = readStorage();
      const filtered = pins.filter((p) => p.id !== pinId);
      writeStorage(filtered);
      return { id: pinId };
    },
  };
};
