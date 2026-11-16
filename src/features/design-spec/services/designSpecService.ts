import type {
  DesignSpecPin,
  CreateDesignPinPayload,
  UpdateDesignPinPayload,
  DesignHistoryResponse,
  ModuleAuditSummary,
  DesignPinChangeRequest,
  PinSummaryItem,
} from '../types/designSpec.types';
import { createLocalStorageAdapter } from '../adapters/localStorageAdapter';

const defaultAdapter = createLocalStorageAdapter('jpan_portal');

export const designSpecService = {
  /**
   * Fetch all pins for a route or project
   */
  async getPins(
    routeKey?: string,
    projectKey = 'jpan_portal'
  ): Promise<{ data: DesignSpecPin[]; message: string }> {
    const adapter = projectKey === 'jpan_portal' ? defaultAdapter : createLocalStorageAdapter(projectKey);
    const pins = await adapter.getPins(routeKey);
    return { data: pins, message: 'Pins retrieved successfully' };
  },

  /**
   * Create a new pinned design spec on an element
   */
  async createPin(
    payload: CreateDesignPinPayload
  ): Promise<{ data: DesignSpecPin; message: string }> {
    const pin = await defaultAdapter.createPin(payload);
    return { data: pin, message: 'Design pin created successfully' };
  },

  /**
   * Update a pinned design spec's text
   */
  async updatePin(
    pinId: string,
    payload: UpdateDesignPinPayload
  ): Promise<{ data: DesignSpecPin; message: string }> {
    if (!defaultAdapter.updatePin) {
      throw new Error('updatePin not supported');
    }
    const pin = await defaultAdapter.updatePin(pinId, payload);
    return { data: pin, message: 'Design pin updated successfully' };
  },

  /**
   * Client approval / sign-off with proof of agreement
   */
  async approvePin(
    pinId: string,
    payload: { approvedByName: string; approvalNotes?: string }
  ): Promise<{ data: DesignSpecPin; message: string }> {
    const pin = await defaultAdapter.approvePin(pinId, payload);
    return { data: pin, message: 'Design pin approved successfully' };
  },

  /**
   * Client request change
   */
  async requestChange(
    pinId: string,
    payload: { requestedBy: string; requestNotes: string; screenshotUrl?: string }
  ): Promise<{ data: DesignSpecPin; message: string }> {
    const pin = await defaultAdapter.requestChange(pinId, payload);
    return { data: pin, message: 'Change request submitted successfully' };
  },

  /**
   * Delete a pin
   */
  async deletePin(pinId: string): Promise<{ data: { id: string }; message: string }> {
    const res = await defaultAdapter.deletePin(pinId);
    return { data: res, message: 'Design pin removed successfully' };
  },

  /**
   * Fetch complete design history & audit logs timeline across modules & screens
   */
  async getDesignHistory(params?: {
    module?: string;
    screen?: string;
    projectKey?: string;
    author?: string;
    pinId?: string;
    recordType?: string;
  }): Promise<{ data: DesignHistoryResponse; message: string }> {
    const adapter = params?.projectKey ? createLocalStorageAdapter(params.projectKey) : defaultAdapter;
    const allPins = await adapter.getAllPins();
    let rawAuditLogs = await adapter.getAuditLogs();

    // Collect all authors
    const authorSet = new Set<string>();
    rawAuditLogs.forEach((log) => {
      if (log.requested_by) authorSet.add(log.requested_by);
      if (log.feature_owner_name) authorSet.add(log.feature_owner_name);
    });
    allPins.forEach((pin) => {
      if (pin.feature_owner_name) authorSet.add(pin.feature_owner_name);
      if (pin.approved_by_name) authorSet.add(pin.approved_by_name);
    });

    // Summary of all pins
    const pinSummaries: PinSummaryItem[] = allPins.map((p) => ({
      id: p.id,
      title: p.title,
      module_name: p.module_name,
      screen_name: p.screen_name,
      route_key: p.route_key,
    }));

    // Group pins & logs into modules
    const moduleMap = new Map<string, {
      screensCount: Set<string>;
      pinsCount: number;
      changesCount: number;
      lastChangeAt: string | null;
      screens: Record<string, {
        screenName: string;
        routeKey: string;
        pinsCount: number;
        changesCount: number;
      }>;
    }>();

    allPins.forEach((pin) => {
      const modName = pin.module_name || 'General';
      const screenName = pin.screen_name || pin.route_key || 'Default Screen';
      const routeKey = pin.route_key || '/';

      if (!moduleMap.has(modName)) {
        moduleMap.set(modName, {
          screensCount: new Set(),
          pinsCount: 0,
          changesCount: 0,
          lastChangeAt: null,
          screens: {},
        });
      }

      const mod = moduleMap.get(modName)!;
      mod.pinsCount += 1;
      mod.screensCount.add(screenName);

      if (!mod.screens[screenName]) {
        mod.screens[screenName] = {
          screenName,
          routeKey,
          pinsCount: 0,
          changesCount: 0,
        };
      }
      mod.screens[screenName].pinsCount += 1;
    });

    rawAuditLogs.forEach((log) => {
      const modName = log.module_name || 'General';
      const screenName = log.screen_name || log.route_key || 'Default Screen';
      const routeKey = log.route_key || '/';

      if (!moduleMap.has(modName)) {
        moduleMap.set(modName, {
          screensCount: new Set(),
          pinsCount: 0,
          changesCount: 0,
          lastChangeAt: null,
          screens: {},
        });
      }

      const mod = moduleMap.get(modName)!;
      mod.changesCount += 1;
      mod.screensCount.add(screenName);

      if (!mod.lastChangeAt || new Date(log.created_at) > new Date(mod.lastChangeAt)) {
        mod.lastChangeAt = log.created_at;
      }

      if (!mod.screens[screenName]) {
        mod.screens[screenName] = {
          screenName,
          routeKey,
          pinsCount: 0,
          changesCount: 0,
        };
      }
      mod.screens[screenName].changesCount += 1;
    });

    const moduleSummaries: ModuleAuditSummary[] = Array.from(moduleMap.entries()).map(
      ([moduleName, data]) => ({
        moduleName,
        screensCount: data.screensCount.size,
        pinsCount: data.pinsCount,
        changesCount: data.changesCount,
        lastChangeAt: data.lastChangeAt,
        screens: data.screens,
      })
    );

    let filteredLogs = rawAuditLogs;
    if (params?.module && params.module !== 'all') {
      filteredLogs = filteredLogs.filter(
        (l) => l.module_name?.toLowerCase() === params.module?.toLowerCase()
      );
    }
    if (params?.author && params.author !== 'all') {
      const qAuthor = params.author.toLowerCase();
      filteredLogs = filteredLogs.filter(
        (l) =>
          l.requested_by?.toLowerCase() === qAuthor ||
          l.feature_owner_name?.toLowerCase() === qAuthor
      );
    }
    if (params?.pinId && params.pinId !== 'all') {
      filteredLogs = filteredLogs.filter((l) => l.pin_id === params.pinId);
    }
    if (params?.recordType && params.recordType !== 'all') {
      filteredLogs = filteredLogs.filter((l) => l.record_type === params.recordType);
    }

    return {
      data: {
        modules: moduleSummaries,
        auditLogs: filteredLogs,
        totalChanges: rawAuditLogs.length,
        totalPins: allPins.length,
        totalMentions: 0,
        allAuthors: Array.from(authorSet),
        allPins: pinSummaries,
      },
      message: 'Design history retrieved successfully',
    };
  },
};
