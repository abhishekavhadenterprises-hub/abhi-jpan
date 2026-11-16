import { axiosClient } from "@/lib/api/axios-client";
import type {
  DesignSpecPin,
  CreateDesignPinPayload,
  UpdateDesignPinPayload,
  DesignHistoryResponse,
} from "../types/designSpec.types";

const DEFAULT_PROJECT_KEY = process.env.NEXT_PUBLIC_PROJECT_KEY || "jpan_portal";

export const designSpecService = {
  /**
   * Fetch all pins for a route or project
   */
  async getPins(
    routeKey?: string,
    projectKey = DEFAULT_PROJECT_KEY,
    label?: string
  ): Promise<{ data: DesignSpecPin[]; message: string }> {
    let url = `/design-spec/pins?projectKey=${encodeURIComponent(projectKey)}`;
    if (routeKey) {
      url += `&routeKey=${encodeURIComponent(routeKey)}`;
    }
    if (label && label !== "all") {
      url += `&label=${encodeURIComponent(label)}`;
    }
    const response = await axiosClient.get<{ data: DesignSpecPin[]; message: string }>(url);
    return response.data;
  },

  /**
   * Create a new pinned design spec on an element
   */
  async createPin(
    payload: CreateDesignPinPayload
  ): Promise<{ data: DesignSpecPin; message: string }> {
    const finalPayload = {
      projectKey: DEFAULT_PROJECT_KEY,
      ...payload,
    };
    const response = await axiosClient.post<{ data: DesignSpecPin; message: string }>(
      "/design-spec/pins",
      finalPayload
    );
    return response.data;
  },

  /**
   * Update a pinned design spec's text or labels (captures change in history)
   */
  async updatePin(
    pinId: string,
    payload: UpdateDesignPinPayload
  ): Promise<{ data: DesignSpecPin; message: string }> {
    const response = await axiosClient.patch<{ data: DesignSpecPin; message: string }>(
      `/design-spec/pins/${pinId}`,
      payload
    );
    return response.data;
  },

  /**
   * Client approval / sign-off with proof of agreement
   */
  async approvePin(
    pinId: string,
    payload: { approvedByName: string; approvalNotes?: string }
  ): Promise<{ data: DesignSpecPin; message: string }> {
    const response = await axiosClient.post<{ data: DesignSpecPin; message: string }>(
      `/design-spec/pins/${pinId}/approve`,
      payload
    );
    return response.data;
  },

  /**
   * Client request change (logs timestamp, increments count)
   */
  async requestChange(
    pinId: string,
    payload: { requestedBy: string; requestNotes: string; screenshotUrl?: string }
  ): Promise<{ data: DesignSpecPin; message: string }> {
    const response = await axiosClient.post<{ data: DesignSpecPin; message: string }>(
      `/design-spec/pins/${pinId}/change-request`,
      payload
    );
    return response.data;
  },

  /**
   * Delete a pin
   */
  async deletePin(pinId: string): Promise<{ data: { id: string }; message: string }> {
    const response = await axiosClient.delete<{ data: { id: string }; message: string }>(
      `/design-spec/pins/${pinId}`
    );
    return response.data;
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
    mention?: string;
    hasMentions?: boolean;
    recordType?: string;
    label?: string;
  }): Promise<{ data: DesignHistoryResponse; message: string }> {
    let url = `/design-spec/history?projectKey=${encodeURIComponent(params?.projectKey || DEFAULT_PROJECT_KEY)}`;
    if (params?.module) {
      url += `&module=${encodeURIComponent(params.module)}`;
    }
    if (params?.screen) {
      url += `&screen=${encodeURIComponent(params.screen)}`;
    }
    if (params?.author && params.author !== "all") {
      url += `&author=${encodeURIComponent(params.author)}`;
    }
    if (params?.pinId && params.pinId !== "all") {
      url += `&pinId=${encodeURIComponent(params.pinId)}`;
    }
    if (params?.mention) {
      url += `&mention=${encodeURIComponent(params.mention)}`;
    }
    if (params?.hasMentions) {
      url += `&hasMentions=true`;
    }
    if (params?.recordType && params.recordType !== "all") {
      url += `&recordType=${encodeURIComponent(params.recordType)}`;
    }
    if (params?.label && params.label !== "all") {
      url += `&label=${encodeURIComponent(params.label)}`;
    }
    const response = await axiosClient.get<{ data: DesignHistoryResponse; message: string }>(url);
    return response.data;
  },

  /**
   * Seed / batch create default design specs to the backend database
   */
  async seedRouteSpecs(
    payloads: CreateDesignPinPayload[],
    projectKey = DEFAULT_PROJECT_KEY
  ): Promise<{ created: number; skipped: number; errors: number }> {
    let created = 0;
    let skipped = 0;
    let errors = 0;

    let existingPins: DesignSpecPin[] = [];
    try {
      const res = await this.getPins(payloads[0]?.routeKey, projectKey);
      existingPins = res.data || [];
    } catch {
      // Continue even if getPins fails
    }

    const existingTitles = new Set(existingPins.map((p) => p.title.trim().toLowerCase()));

    for (const item of payloads) {
      if (existingTitles.has(item.title.trim().toLowerCase())) {
        skipped++;
        continue;
      }
      try {
        await this.createPin({ ...item, projectKey });
        created++;
      } catch (err) {
        console.error(`Failed to seed pin "${item.title}":`, err);
        errors++;
      }
    }

    return { created, skipped, errors };
  },
};

export default designSpecService;
