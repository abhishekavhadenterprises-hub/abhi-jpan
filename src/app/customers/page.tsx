import { CustomersHero } from "@/components/customers/CustomersHero";
import { ClientLogosGrid } from "@/components/customers/ClientLogosGrid";
import { CustomerIndustries } from "@/components/customers/CustomerIndustries";
import { CustomerKeyHighlights } from "@/components/customers/CustomerKeyHighlights";
import { CustomerPartnershipStats } from "@/components/customers/CustomerPartnershipStats";
import { CustomerTestimonials } from "@/components/customers/CustomerTestimonials";
import { CustomerCaseStudies } from "@/components/customers/CustomerCaseStudies";
import { CustomersCTA } from "@/components/customers/CustomersCTA";

export const metadata = {
  title: "Our Customers | J Pan Tubular Components Limited",
  description: "Trusted by leading global brands in HVAC, Automotive, and Industrial sectors. Explore our diverse client portfolio and market presence.",
};

export default function CustomersPage() {
  return (
    <main className="overflow-hidden">
      <div className="animate-in fade-in duration-1000">
        <CustomersHero />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
        <ClientLogosGrid />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
        <CustomerIndustries />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 fill-mode-both">
        <CustomerKeyHighlights />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
        <CustomerPartnershipStats />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 fill-mode-both">
        <CustomerTestimonials />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-both">
        <CustomerCaseStudies />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800 fill-mode-both">
        <CustomersCTA />
      </div>
    </main>
  );
}
