import React from "react";
import { Metadata } from "next";
import { JobHero } from "@/components/careers/JobHero";
import { JobSummary } from "@/components/careers/JobSummary";
import { JobSpecs } from "@/components/careers/JobSpecs";
import { JobResponsibilities } from "@/components/careers/JobResponsibilities";
import { JobCompetencies } from "@/components/careers/JobCompetencies";
import { JobPerks } from "@/components/careers/JobPerks";
import { JobApplicationForm } from "@/components/careers/JobApplicationForm";
import { JobRelated } from "@/components/careers/JobRelated";
import { JobDetailCTA } from "@/components/careers/JobDetailCTA";




export async function generateStaticParams() {
  return [
    { slug: "senior-production-engineer" },
    { slug: "quality-assurance-specialist" },
    { slug: "operations-manager" },
    { slug: "hr-generalist" },
    { slug: "maintenance-technician" },
    { slug: "structural-design-lead" },
  ];
}

// Mock function to simulate fetching job data
async function getJobData(slug: string) {
  // In a real app, this would fetch from a CMS or DB
  return {
    title: slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    location: "Sarkhej, Ahmedabad",
    experience: "5-8 Years",
    type: "Full-Time",
    posted: "May 12, 2025",
    summary: "We are seeking a high-precision Production Engineer to lead our manufacturing floor operations. The successful candidate will be responsible for optimizing production cycles, ensuring technical compliance with international standards, and mentoring junior operations staff.",
    department: "Manufacturing",
    reportingTo: "Operations Director",
    salary: "Institutional Standards",
    responsibilities: [
      "Oversee daily production cycles to ensure 100% technical compliance.",
      "Identify operational bottlenecks and implement Six Sigma optimizations.",
      "Lead a team of 20+ technical operators and maintenance staff.",
      "Ensure adherence to international ISO quality standards.",
      "Collaborate with R&D for new product development and scaling.",
      "Monitor raw material consumption and minimize industrial waste.",
      "Prepare technical reports on production performance and quality metrics.",
      "Implement and maintain workplace safety protocols (HSE)."
    ],
    qualifications: [
      "B.Tech/B.E. in Mechanical or Production Engineering.",
      "Post-graduate degree in Operations Management preferred.",
      "Minimum 5 years of experience in heavy industrial manufacturing.",
      "Proven track record in high-density production environment."
    ],
    skills: [
      "AutoCAD / SolidWorks",
      "Lean Manufacturing",
      "ERP Integration (SAP/Oracle)",
      "Quality Control (QA/QC)",
      "Technical Leadership",
      "Strategic Planning",
      "Root Cause Analysis",
      "Industrial Automation"
    ],
    certifications: "Six Sigma Black Belt / PMP Preferred"
  };
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobData(slug);
  return {
    title: `${job.title} | Careers | J Pan Tubular Components Limited`,
    description: `Explore the ${job.title} position at J Pan Tubular Components Limited. Join a leader in precision manufacturing and build your professional legacy.`,
  };
}

export default async function JobDetailPage({ params }: any) {
  const { slug } = await params;
  const job = await getJobData(slug);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.summary,
    "datePosted": "2025-05-12",
    "validThrough": "2026-05-12",
    "employmentType": job.type.toUpperCase().replace("-", "_"),
    "hiringOrganization": {
      "@type": "Organization",
      "name": "J Pan Tubular Components Limited",
      "sameAs": "https://jpantubular.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sarkhej",
        "addressRegion": "Ahmedabad",
        "addressCountry": "IN"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "unitText": "MONTH"
      }
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobHero job={job} />
      <JobSummary job={job} />
      <JobSpecs job={job} />
      <JobResponsibilities responsibilities={job.responsibilities} />
      <JobCompetencies 
        qualifications={job.qualifications} 
        skills={job.skills} 
        certifications={job.certifications} 
      />
      <JobPerks />
      
      <JobApplicationForm />
      <JobRelated />
      <JobDetailCTA />
    </main>
  );
}


