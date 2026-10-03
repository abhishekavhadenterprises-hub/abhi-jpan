# Implementation Plan: Jpan Tubular "Products" Page

This document outlines the systematic approach to building the "Products" page for J pan Tubular, based on the content structure provided in `Products.md`. The design will prioritize clean industrial aesthetics, high-performance filtering, and detailed technical presentation.

---

## Section-by-Section Analysis

### 1. Hero Section
*   **Visual Strategy**: High-res composite image of copper and steel components.
*   **Message**: Focus on the breadth and depth of manufacturing solutions.

### 2. Filter / Category Bar
*   **Visual Strategy**: Sticky horizontal bar with glassmorphism or clean metallic tabs.
*   **Functionality**: Quick filtering by category (Copper, Tubing, Assemblies) and industry application.

### 3. Products Grid Section
*   **Visual Strategy**: Responsive 3 or 4-column grid of product cards.
*   **Card Design**: High-contrast product imagery, minimal technical titles, and clear "View Details" buttons.

### 4. Product Categories Highlight
*   **Visual Strategy**: Large-format cards for "Primary Families" (HVAC, Auto, Industrial).
*   **Aesthetics**: Category-specific background textures and bold typography.

### 5. Custom Manufacturing Section
*   **Visual Strategy**: Split-screen layout highlighting design support and OEM capabilities.
*   **Tone**: Focus on partnership, bespoke engineering, and precision.

### 6. Industries Usage (Trust Section)
*   **Visual Strategy**: Mini-icon grid showing sectors where products are utilized.
*   **Consistency**: Maintain visual parity with the homepage "Industries" section but in a more compact form.

### 7. CTA Section
*   **Visual Strategy**: Strong high-contrast banner with a "Get Quote" primary action.

### 8. Footer
*   **Implementation**: Reuse the global `Footer` component.

---

## Implementation Phases

### Phase 1: Product Foundation (Sections 1-2)
*   [x] **Section 1 (Hero)**: Implement the "All Products" hero with optimized product imagery.
*   [x] **Section 2 (Filter Bar)**: Build the dynamic filter/category navigation bar with active states.

### Phase 2: Catalog & Detail (Sections 3-4)
*   [x] **Section 3 (Products Grid)**: Develop the main product card component and the responsive grid layout.
*   [x] **Section 4 (Categories Highlight)**: Create the large-format category feature cards.

### Phase 3: Capabilities & Trust (Sections 5-6)
*   [x] **Section 5 (Custom Manufacturing)**: Build the "Need Custom Product?" section with engineering highlights.
*   [x] **Section 6 (Industries Usage)**: Implement the compact industry trust markers.

### Phase 4: Conversion & Filtering (Section 7 + Logic)
*   [x] **Section 7 (CTA Strip)**: Implement the product-specific conversion banner.
*   [x] **Filtering Logic**: Implement the functional logic to filter the products grid based on category selection.

### Phase 5: Polish & Performance
*   [x] Integrate the global `Navbar` and `Footer`.
*   [x] Add scroll-triggered animations for product grid entry.
*   [x] Optimize all product imagery for WebP/Next.js Image.
*   [x] Final responsive audit (Mobile/Tablet/Desktop).
