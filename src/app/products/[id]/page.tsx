import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, ArrowRight, ChevronRight, Layers, Settings, Sparkles, Box } from "lucide-react";
import { getProductById, getAllProducts, getRelatedProducts } from "@/data/products";
import type { Metadata } from "next";

import { ProductDetailGallery } from "@/components/products/shared/ProductDetailGallery";

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | J pan Tubular",
    };
  }

  return {
    title: `${product.name} | J pan Tubular - Industrial Component Catalog`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, product.category, 4);

  return (
    <main className="min-h-screen bg-white dark:bg-[#05080f] text-charcoal dark:text-white pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-hidden relative">
      {/* Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(var(--color-charcoal) 1px, transparent 1px)`, backgroundSize: '32px 32px' }} 
      />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        
        {/* Top Header Navigation & Breadcrumbs */}
        <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/products"
            className="inline-flex items-center text-xs font-extrabold uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors group px-3.5 sm:px-4 py-2 rounded-xl bg-silver/10 dark:bg-white/5 border border-border/50 hover:border-gold/40"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform text-gold shrink-0" />
            <span>Back to Products Catalog</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold bg-gold/10 px-3.5 sm:px-4 py-1.5 rounded-full border border-gold/30">
              {product.category}
            </span>
          </div>
        </div>

        {/* Category Lead Badge & Main Title */}
        <div className="mb-8 sm:mb-10 space-y-2.5 sm:space-y-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 sm:w-10 h-0.5 bg-gold shrink-0" />
            <span className="text-gold font-extrabold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[10px] sm:text-xs truncate">
              PRECISION INDUSTRIAL SPECIFICATION
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight uppercase text-charcoal dark:text-white leading-[1.1] sm:leading-[1.05]">
            {product.name}
          </h1>
        </div>

        {/* Product Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start mb-16 sm:mb-24">
          
          {/* Left Column: Premium Interactive Product Display */}
          <div className="lg:col-span-6 relative">
            <ProductDetailGallery
              name={product.name}
              specs={product.specs}
              image={product.image}
              images={product.images}
            />
          </div>

          {/* Right Column: Detailed Product Content */}
          <div className="lg:col-span-6 flex flex-col space-y-5 sm:space-y-6">
            
            {/* Overview Lead Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-charcoal/90 dark:text-white/90 leading-relaxed font-normal border-l-2 border-gold/50 pl-4 sm:pl-6 py-1">
              {product.overview ||
                `At J pan Tubular, we specialize in manufacturing a comprehensive range of ${product.name} components that form the backbone of heat exchangers, condensers, evaporators, boilers, and industrial piping systems. Engineered with precision and reliability, our tubing solutions are available in copper, brass, cupro-nickel, and carbon steel, providing versatility across diverse applications.`}
            </p>

            {/* We Offer Card Block */}
            <div className="bg-silver/10 dark:bg-white/[0.03] border border-border/60 rounded-2xl p-5 sm:p-7 space-y-4 relative overflow-hidden">
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-gold flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> We offer:
              </h3>
              
              <ul className="space-y-3 text-xs sm:text-sm md:text-base text-charcoal/90 dark:text-white/90 font-medium">
                {product.offerings && product.offerings.length > 0 ? (
                  product.offerings.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-1" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-1" />
                      <span className="leading-snug">
                        Custom sizes & geometries: 3 mm, 5 mm, 6.35 mm, 7 mm, 7.94 mm, 9.52 mm, 12.7 mm up to 101.6 mm
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-1" />
                      <span className="leading-snug">Headers, End-Formed Assemblies & Custom Bent Straight Tubings</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Quality Assurance Paragraph */}
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
              {product.qualityAssurance ||
                "With options in multiple diameters, wall thicknesses, and surface finishes, our components are ideal for high-pressure steam lines, seawater cooling systems, and hygienic fluid transfer. Each component undergoes stringent hydro, pneumatic, or eddy current testing to ensure leak-free performance and full compliance with international standards."}
            </p>

            {/* Applications & Final Callout Paragraph */}
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed font-medium whitespace-pre-line">
              {product.applications ||
                `Designed for efficiency, durability, and adaptability, J pan Tubular ${product.name} components deliver trusted solutions for HVAC, marine, industrial, automotive, and energy applications.`}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-charcoal dark:bg-white text-white dark:text-charcoal font-bold text-xs uppercase tracking-widest rounded-xl overflow-hidden transition-all active:scale-95 btn-slide-gold w-full sm:w-auto text-center"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-500 truncate">Request Quote & Specs</span>
                <ArrowRight className="w-4 h-4 relative z-10 text-gold group-hover:text-black group-hover:translate-x-1 transition-all shrink-0" />
              </Link>

              <Link
                href="/quality"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 border border-border text-charcoal dark:text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:border-gold hover:text-gold transition-all w-full sm:w-auto text-center"
              >
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span className="truncate">Quality Compliance</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section: CATEGORY CATALOG */}
        <div className="mt-12 sm:mt-20 pt-10 sm:pt-14 border-t border-border/40">
          <div className="flex items-center justify-between mb-8 sm:mb-10 pb-3 sm:pb-4 border-b border-border/30">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-6 sm:w-8 h-0.5 bg-gold shrink-0" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-extrabold uppercase tracking-wider text-charcoal dark:text-white truncate">
                CATEGORY CATALOG
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold uppercase tracking-widest text-gold hover:underline flex items-center gap-1 group shrink-0"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {relatedProducts.map((catProduct) => (
              <Link
                key={catProduct.id}
                href={`/products/${catProduct.id}`}
                className="group bg-white dark:bg-[#0a0f18] border border-border/60 rounded-2xl sm:rounded-[1.75rem] p-4 sm:p-6 transition-all duration-500 hover:border-gold/60 hover:-translate-y-1.5 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Side Hover Accent */}
                <div className="absolute left-0 top-0 w-1 h-0 bg-gold transition-all duration-500 group-hover:h-full" />

                <div className="relative aspect-[4/3] w-full mb-3 sm:mb-5 overflow-hidden rounded-xl sm:rounded-2xl bg-silver/10 dark:bg-white/[0.02] p-2 sm:p-4 flex items-center justify-center border border-border/40">
                  <Image
                    src={catProduct.image}
                    alt={catProduct.name}
                    fill
                    className="object-contain p-2 transition-transform duration-700 group-hover:scale-108"
                  />
                </div>
                
                <h3 className="font-heading font-bold text-sm sm:text-base md:text-lg text-charcoal dark:text-white leading-snug tracking-normal group-hover:text-gold transition-colors mt-auto mb-2 line-clamp-1">
                  {catProduct.name}
                </h3>

                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
