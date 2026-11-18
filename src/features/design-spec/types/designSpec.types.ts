export interface DesignSpecPin {
  id: string;
  project_key: string;
  route_key: string;
  module_name?: string | null;
  sub_module_name?: string | null;
  screen_name?: string | null;
  component_name?: string | null;
  screenshot_url?: string | null;
  selector: string;
  element_tag?: string;
  element_text?: string;
  bounding_rect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  title: string;
  description: string;
  how_it_works: string;
  feature_owner_name: string;
  feature_owner_role: string;
  status: 'pending_approval' | 'approved' | 'changes_requested';
  approved_by_name?: string | null;
  approved_at?: string | null;
  approval_notes?: string | null;
  agreement_hash?: string | null;
  change_request_count: number;
  last_change_requested_at?: string | null;
  labels?: string[];
  created_at: string;
  updated_at: string;
  changeRequests?: DesignPinChangeRequest[];
  mentions?: string[];
}

export interface DesignPinChangeRequest {
  id: string;
  pin_id: string;
  requested_by: string;
  request_notes: string;
  previous_status: string;
  record_type?: 'change_requested' | 'approved' | 'spec_created' | 'spec_updated';
  screenshot_url?: string | null;
  created_at: string;
  pin_title?: string;
  pin_description?: string;
  pin_how_it_works?: string;
  feature_owner_name?: string;
  route_key?: string;
  module_name?: string;
  sub_module_name?: string;
  screen_name?: string;
  component_name?: string;
  element_tag?: string;
  element_text?: string;
  pin_screenshot_url?: string;
  labels?: string[];
  mentions?: string[];
}

export interface ModuleAuditSummary {
  moduleName: string;
  screensCount: number;
  pinsCount: number;
  changesCount: number;
  lastChangeAt: string | null;
  screens: Record<string, {
    screenName: string;
    routeKey: string;
    pinsCount: number;
    changesCount: number;
  }>;
}

export interface PinSummaryItem {
  id: string;
  title: string;
  module_name?: string | null;
  screen_name?: string | null;
  route_key?: string;
  labels?: string[];
}

export interface DesignHistoryResponse {
  modules: ModuleAuditSummary[];
  auditLogs: DesignPinChangeRequest[];
  totalChanges: number;
  totalPins: number;
  totalMentions?: number;
  allAuthors?: string[];
  allMentions?: string[];
  allLabels?: string[];
  allPins?: PinSummaryItem[];
}

export interface CreateDesignPinPayload {
  projectKey?: string;
  routeKey: string;
  moduleName?: string;
  subModuleName?: string;
  screenName?: string;
  componentName?: string;
  screenshotUrl?: string;
  selector: string;
  elementTag: string;
  elementText: string;
  boundingRect?: {
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
  };
  title: string;
  description?: string;
  goal?: string;
  howItWorks: string;
  featureOwnerName: string;
  featureOwnerRole?: string;
  labels?: string[];
  mentions?: string[];
}

export interface UpdateDesignPinPayload {
  title?: string;
  description?: string;
  howItWorks?: string;
  featureOwnerName?: string;
  labels?: string[];
}

/**
 * Pluggable storage adapter interface for DesignPinOverlay.
 * Enables using DesignPinOverlay with LocalStorage, REST APIs, GraphQL, Firebase, etc.
 */
export interface DesignPinAdapter {
  getPins: (routeKey?: string, projectKey?: string) => Promise<DesignSpecPin[]>;
  createPin: (payload: CreateDesignPinPayload) => Promise<DesignSpecPin>;
  updatePin?: (pinId: string, payload: UpdateDesignPinPayload) => Promise<DesignSpecPin>;
  approvePin: (
    pinId: string,
    payload: { approvedByName: string; approvalNotes?: string }
  ) => Promise<DesignSpecPin>;
  requestChange: (
    pinId: string,
    payload: { requestedBy: string; requestNotes: string; screenshotUrl?: string }
  ) => Promise<DesignSpecPin>;
  deletePin: (pinId: string) => Promise<{ id: string }>;
}

/**
 * Reusable props for the DesignPinOverlay component.
 */
export interface DesignPinOverlayProps {
  /** Project key or workspace identifier (default: 'default') */
  projectKey?: string;

  /** Active route key (e.g. '/dashboard'). Defaults to window.location.pathname */
  currentRoute?: string;

  /** Function to infer module and screen names from a route string */
  getRouteContext?: (route: string) => { moduleName: string; screenName: string };

  /** Current user identity for feature owner and stakeholder sign-off */
  currentUser?: {
    name: string;
    role?: string;
  };

  /** Storage adapter (defaults to built-in LocalStorage adapter for zero-config use) */
  adapter?: DesignPinAdapter;

  /** Notification callback for toast alerts */
  onNotify?: (type: 'success' | 'error' | 'info', message: string) => void;

  /** Whether the overlay is enabled (default: true) */
  enabled?: boolean;

  /** Initial toolbar expansion state if not yet saved in localStorage (default: true) */
  defaultToolbarExpanded?: boolean;

  /** Optional custom CSS class */
  className?: string;
}

