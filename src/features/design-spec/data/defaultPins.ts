import type { DesignSpecPin, CreateDesignPinPayload } from '../types/designSpec.types';

// =========================================================================
// ROUTE: / (Home Page)
// =========================================================================
export const HOME_PINS: DesignSpecPin[] = [];

// =========================================================================
// ROUTE: /products
// =========================================================================
export const PRODUCTS_PINS: DesignSpecPin[] = [
  {
    id: 'products-catalog-header',
    project_key: 'jpan_portal',
    route_key: '/products',
    module_name: 'Products',
    sub_module_name: 'Catalog',
    screen_name: 'Product Catalog',
    component_name: 'Catalog Header & Filter Strip',
    selector: 'h1, section:first-of-type',
    element_tag: 'h1',
    element_text: 'Engineering Product Catalog & Specifications',
    bounding_rect: { top: 90, left: 100, width: 800, height: 48 },
    title: 'Product Catalog & Technical Specification Matrix',
    description: 'Goal: Detailed technical breakdown of manufactured HVAC and automotive tubing assemblies.',
    how_it_works: 'Allows filtering by alloy grade (DHP Copper, Aluminum 3003/6063), tube diameter (3/16 to 1-1/8 inch), and application.',
    feature_owner_name: 'Abhishek AE',
    feature_owner_role: 'Engineering Lead',
    status: 'approved',
    approved_by_name: 'Corporate Management',
    approved_at: '2026-11-10T11:00:00.000Z',
    approval_notes: 'Technical specification filter approved',
    agreement_hash: 'sha256_prod_01_approved',
    change_request_count: 0,
    created_at: '2026-11-10T09:30:00.000Z',
    updated_at: '2026-11-10T11:00:00.000Z',
  },
];

// =========================================================================
// ROUTE: /quality
// =========================================================================
export const QUALITY_PINS: DesignSpecPin[] = [
  {
    id: 'quality-assurance-header',
    project_key: 'jpan_portal',
    route_key: '/quality',
    module_name: 'Quality Assurance',
    sub_module_name: 'Certifications',
    screen_name: 'Quality Standards',
    component_name: 'Zero Defect Quality Header',
    selector: 'h1, section:first-of-type',
    element_tag: 'h1',
    element_text: 'Zero-Defect Quality Assurance & Global Standards',
    bounding_rect: { top: 90, left: 100, width: 800, height: 48 },
    title: 'Zero-Defect Quality Assurance & Standards',
    description: 'Goal: Demonstrate JPan strict ISO/IATF quality controls, CMM precision verification, and helium leak detection tests.',
    how_it_works: 'Provides downloadable certification documents and visual inspection workflow charts.',
    feature_owner_name: 'Abhishek AE',
    feature_owner_role: 'Quality Lead',
    status: 'approved',
    approved_by_name: 'Corporate Management',
    approved_at: '2026-11-10T11:30:00.000Z',
    approval_notes: 'Quality inspection standards approved',
    agreement_hash: 'sha256_qual_01_approved',
    change_request_count: 0,
    created_at: '2026-11-10T10:00:00.000Z',
    updated_at: '2026-11-10T11:30:00.000Z',
  },
];

// =========================================================================
// ROUTE: /contact
// =========================================================================
export const CONTACT_PINS: DesignSpecPin[] = [
  {
    id: 'contact-form-spec',
    project_key: 'jpan_portal',
    route_key: '/contact',
    module_name: 'Contact & Inquiries',
    sub_module_name: 'RFQ Submission',
    screen_name: 'Contact Us',
    component_name: 'OEM RFQ Submission Form',
    selector: 'form, [data-spec="contact-form"]',
    element_tag: 'form',
    element_text: 'Request for Quote & Technical Consultation',
    bounding_rect: { top: 150, left: 100, width: 600, height: 500 },
    title: 'OEM Request for Quote & Technical Consultation',
    description: 'Goal: Streamlined procurement inquiry intake allowing OEM engineers to upload 2D/3D CAD drawings.',
    how_it_works: 'Directs form inquiries to corporate engineering sales teams with automated receipt confirmation.',
    feature_owner_name: 'Abhishek AE',
    feature_owner_role: 'Corporate Lead',
    status: 'approved',
    approved_by_name: 'Corporate Management',
    approved_at: '2026-11-10T12:00:00.000Z',
    approval_notes: 'Inquiry workflow approved',
    agreement_hash: 'sha256_contact_01_approved',
    change_request_count: 0,
    created_at: '2026-11-10T10:30:00.000Z',
    updated_at: '2026-11-10T12:00:00.000Z',
  },
];

export const DEFAULT_ROUTE_SPECS_MAP: Record<string, DesignSpecPin[]> = {
  '/': HOME_PINS,
  '/products': PRODUCTS_PINS,
  '/quality': QUALITY_PINS,
  '/contact': CONTACT_PINS,
};

export const ALL_DEFAULT_PINS: DesignSpecPin[] = [
  ...HOME_PINS,
  ...PRODUCTS_PINS,
  ...QUALITY_PINS,
  ...CONTACT_PINS,
];

export const getDefaultPinsForRoute = (
  routeKey?: string,
  projectKey = 'jpan_portal'
): DesignSpecPin[] => {
  if (!routeKey) return [];
  const normalizedRoute = routeKey.replace(/\/$/, '') || '/';
  const baseRoute = normalizedRoute.split('?')[0];
  const defaultPins =
    DEFAULT_ROUTE_SPECS_MAP[normalizedRoute] ||
    DEFAULT_ROUTE_SPECS_MAP[baseRoute] ||
    [];
  return defaultPins.map((p) => ({ ...p, project_key: projectKey }));
};

export const getAllDefaultSpecPayloads = (): CreateDesignPinPayload[] => {
  return ALL_DEFAULT_PINS.map((p) => ({
    projectKey: p.project_key,
    routeKey: p.route_key,
    moduleName: p.module_name || undefined,
    subModuleName: p.sub_module_name || undefined,
    screenName: p.screen_name || undefined,
    componentName: p.component_name || undefined,
    selector: p.selector,
    elementTag: p.element_tag || 'div',
    elementText: p.element_text || '',
    boundingRect: p.bounding_rect,
    title: p.title,
    description: p.description,
    howItWorks: p.how_it_works,
    featureOwnerName: p.feature_owner_name,
    featureOwnerRole: p.feature_owner_role,
  }));
};
