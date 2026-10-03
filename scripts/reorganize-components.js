const fs = require('fs');
const path = require('path');

const ROOT_COMPONENTS = path.resolve('./src/components');

// Mapping of filename to target folder relative to src/components
const fileMapping = {
  // Home
  'Hero.tsx': 'home',
  'AboutSnapshot.tsx': 'home',
  'Industries.tsx': 'home',
  'ProductShowcase.tsx': 'home',
  'WhyChooseUs.tsx': 'home',
  'Infrastructure.tsx': 'home',
  'Certifications.tsx': 'home',
  'Testimonials.tsx': 'home',
  'CTAStrip.tsx': 'home',
  'ContactPreview.tsx': 'home',

  // About
  'AboutHero.tsx': 'about',
  'OurStory.tsx': 'about',
  'CompanyOverview.tsx': 'about',
  'VisionMission.tsx': 'about',
  'JourneyTimeline.tsx': 'about',
  'Leadership.tsx': 'about',
  'AboutManufacturing.tsx': 'about',
  'AboutQuality.tsx': 'about',
  'AboutPresence.tsx': 'about',
  'AboutWhyChooseUs.tsx': 'about',
  'AboutCTA.tsx': 'about',

  // Products
  'ProductCard.tsx': 'products/shared',
  'ProductsHero.tsx': 'products/shared',
  'FilterBar.tsx': 'products/shared',
  'ProductsGrid.tsx': 'products/shared',
  'ProductDetailGallery.tsx': 'products/shared',
  'ProductIndustries.tsx': 'products/shared',
  'CategoryHighlights.tsx': 'products/shared',
  'CustomManufacturing.tsx': 'products/shared',
  'ProductCTA.tsx': 'products/shared',

  // Investors - Annual Reports
  'AnnualReportsHero.tsx': 'investors/annual-reports',
  'AnnualReportsIntro.tsx': 'investors/annual-reports',
  'AnnualReportsHighlights.tsx': 'investors/annual-reports',
  'AnnualReportsInvestorInfo.tsx': 'investors/annual-reports',
  'AnnualReportsFilter.tsx': 'investors/annual-reports',
  'AnnualReportsGrid.tsx': 'investors/annual-reports',
  'AnnualReportsDetailModal.tsx': 'investors/annual-reports',
  'AnnualReportsCTA.tsx': 'investors/annual-reports',

  // Investors - Annual Return
  'AnnualReturnHero.tsx': 'investors/annual-return',
  'AnnualReturnIntro.tsx': 'investors/annual-return',
  'AnnualReturnComplianceNotes.tsx': 'investors/annual-return',
  'AnnualReturnFilter.tsx': 'investors/annual-return',
  'AnnualReturnTable.tsx': 'investors/annual-return',
  'AnnualReturnDetailModal.tsx': 'investors/annual-return',
  'AnnualReturnCTA.tsx': 'investors/annual-return',

  // Investors - Board Meeting Notices
  'BoardMeetingHero.tsx': 'investors/board-meeting-notices',
  'BoardMeetingIntro.tsx': 'investors/board-meeting-notices',
  'BoardMeetingGovernanceNotes.tsx': 'investors/board-meeting-notices',
  'BoardMeetingFilter.tsx': 'investors/board-meeting-notices',
  'BoardMeetingListing.tsx': 'investors/board-meeting-notices',
  'BoardMeetingDetailModal.tsx': 'investors/board-meeting-notices',
  'BoardMeetingCTA.tsx': 'investors/board-meeting-notices',

  // Investors - Call Audio Recordings
  'AudioHero.tsx': 'investors/call-audio-recordings',
  'AudioIntro.tsx': 'investors/call-audio-recordings',
  'AudioFilter.tsx': 'investors/call-audio-recordings',
  'AudioListing.tsx': 'investors/call-audio-recordings',
  'AudioPlayer.tsx': 'investors/call-audio-recordings',
  'AudioCTA.tsx': 'investors/call-audio-recordings',

  // Investors - Call Transcripts
  'TranscriptHero.tsx': 'investors/call-transcripts',
  'TranscriptIntro.tsx': 'investors/call-transcripts',
  'TranscriptFilter.tsx': 'investors/call-transcripts',
  'TranscriptListing.tsx': 'investors/call-transcripts',
  'TranscriptDetailModal.tsx': 'investors/call-transcripts',
  'TranscriptCTA.tsx': 'investors/call-transcripts',

  // Investors - Financial Results
  'FinancialHero.tsx': 'investors/financial-results',
  'FinancialIntro.tsx': 'investors/financial-results',
  'FinancialHighlights.tsx': 'investors/financial-results',
  'FinancialInvestorInfo.tsx': 'investors/financial-results',
  'FinancialFilter.tsx': 'investors/financial-results',
  'FinancialResultsList.tsx': 'investors/financial-results',
  'FinancialDetailModal.tsx': 'investors/financial-results',
  'FinancialCTA.tsx': 'investors/financial-results',

  // Investors - General Meeting
  'GeneralMeetingHero.tsx': 'investors/general-meeting',
  'GeneralMeetingIntro.tsx': 'investors/general-meeting',
  'GeneralMeetingInstructions.tsx': 'investors/general-meeting',
  'GeneralMeetingFilter.tsx': 'investors/general-meeting',
  'GeneralMeetingListing.tsx': 'investors/general-meeting',
  'GeneralMeetingDetailModal.tsx': 'investors/general-meeting',
  'GeneralMeetingCTA.tsx': 'investors/general-meeting',

  // Investors - Grievance
  'GrievanceHero.tsx': 'investors/investor-grievance',
  'GrievanceIntro.tsx': 'investors/investor-grievance',
  'GrievanceSupport.tsx': 'investors/investor-grievance',
  'GrievanceForm.tsx': 'investors/investor-grievance',
  'GrievanceRoadmap.tsx': 'investors/investor-grievance',
  'GrievanceTracking.tsx': 'investors/investor-grievance',
  'GrievanceCTA.tsx': 'investors/investor-grievance',

  // Investors - Meet Intimation
  'InvestorMeetHero.tsx': 'investors/investor-meet-intimation',
  'InvestorMeetIntro.tsx': 'investors/investor-meet-intimation',
  'InvestorMeetCommunicationNotes.tsx': 'investors/investor-meet-intimation',
  'InvestorMeetFilter.tsx': 'investors/investor-meet-intimation',
  'InvestorMeetListing.tsx': 'investors/investor-meet-intimation',
  'InvestorMeetDetailModal.tsx': 'investors/investor-meet-intimation',
  'InvestorMeetCTA.tsx': 'investors/investor-meet-intimation',

  // Investors - Presentation
  'InvestorPresentationHero.tsx': 'investors/investor-presentation',
  'InvestorPresentationIntro.tsx': 'investors/investor-presentation',
  'InvestorPresentationHighlights.tsx': 'investors/investor-presentation',
  'InvestorPresentationFilter.tsx': 'investors/investor-presentation',
  'InvestorPresentationListing.tsx': 'investors/investor-presentation',
  'InvestorPresentationDetailModal.tsx': 'investors/investor-presentation',
  'InvestorPresentationCTA.tsx': 'investors/investor-presentation',

  // Investors - Material Documents & Contracts
  'MaterialHero.tsx': 'investors/material-documents-contracts',
  'MaterialIntro.tsx': 'investors/material-documents-contracts',
  'MaterialHighlights.tsx': 'investors/material-documents-contracts',
  'MaterialCompliance.tsx': 'investors/material-documents-contracts',
  'MaterialFilter.tsx': 'investors/material-documents-contracts',
  'MaterialListing.tsx': 'investors/material-documents-contracts',
  'MaterialDetailModal.tsx': 'investors/material-documents-contracts',
  'MaterialCTA.tsx': 'investors/material-documents-contracts',

  // Investors - Newspaper Publication
  'PublicationHero.tsx': 'investors/newspaper-publication',
  'PublicationIntro.tsx': 'investors/newspaper-publication',
  'PublicationCompliance.tsx': 'investors/newspaper-publication',
  'PublicationFilter.tsx': 'investors/newspaper-publication',
  'PublicationListing.tsx': 'investors/newspaper-publication',
  'PublicationDetailModal.tsx': 'investors/newspaper-publication',
  'PublicationCTA.tsx': 'investors/newspaper-publication',

  // Investors - Policies
  'PoliciesHero.tsx': 'investors/policies',
  'PoliciesIntro.tsx': 'investors/policies',
  'PoliciesHighlights.tsx': 'investors/policies',
  'PoliciesFilter.tsx': 'investors/policies',
  'PoliciesListing.tsx': 'investors/policies',
  'PoliciesDetailModal.tsx': 'investors/policies',
  'PoliciesCTA.tsx': 'investors/policies',

  // Investors - Press Releases
  'PressHero.tsx': 'investors/press-releases',
  'PressIntro.tsx': 'investors/press-releases',
  'PressFeatured.tsx': 'investors/press-releases',
  'PressFilter.tsx': 'investors/press-releases',
  'PressList.tsx': 'investors/press-releases',
  'PressDetailModal.tsx': 'investors/press-releases',
  'PressCTA.tsx': 'investors/press-releases',

  // Investors - Secretarial Compliance
  'SecretarialComplianceHero.tsx': 'investors/secretarial-compliance',
  'SecretarialComplianceIntro.tsx': 'investors/secretarial-compliance',
  'SecretarialComplianceNote.tsx': 'investors/secretarial-compliance',
  'SecretarialComplianceFilter.tsx': 'investors/secretarial-compliance',
  'SecretarialComplianceListing.tsx': 'investors/secretarial-compliance',
  'SecretarialComplianceDetailModal.tsx': 'investors/secretarial-compliance',
  'SecretarialComplianceCTA.tsx': 'investors/secretarial-compliance',

  // Investors - Shareholding Pattern
  'ShareholdingHero.tsx': 'investors/shareholding-pattern',
  'ShareholdingIntro.tsx': 'investors/shareholding-pattern',
  'ShareholdingSummary.tsx': 'investors/shareholding-pattern',
  'ShareholdingNote.tsx': 'investors/shareholding-pattern',
  'ShareholdingFilter.tsx': 'investors/shareholding-pattern',
  'ShareholdingListing.tsx': 'investors/shareholding-pattern',
  'ShareholdingDetailModal.tsx': 'investors/shareholding-pattern',
  'ShareholdingCTA.tsx': 'investors/shareholding-pattern',

  // Investors - Statement of Deviations
  'StatementOfDeviationsHero.tsx': 'investors/statement-of-deviations',
  'StatementOfDeviationsIntro.tsx': 'investors/statement-of-deviations',
  'StatementOfDeviationsNote.tsx': 'investors/statement-of-deviations',
  'StatementOfDeviationsFilter.tsx': 'investors/statement-of-deviations',
  'StatementOfDeviationsListing.tsx': 'investors/statement-of-deviations',
  'StatementOfDeviationsDetailModal.tsx': 'investors/statement-of-deviations',
  'StatementOfDeviationsCTA.tsx': 'investors/statement-of-deviations',

  // Investors - Unclaimed Unpaid
  'UnclaimedHero.tsx': 'investors/unclaimed-unpaid',
  'UnclaimedIntro.tsx': 'investors/unclaimed-unpaid',
  'UnclaimedCompliance.tsx': 'investors/unclaimed-unpaid',
  'UnclaimedRecovery.tsx': 'investors/unclaimed-unpaid',
  'UnclaimedSearch.tsx': 'investors/unclaimed-unpaid',
  'UnclaimedTable.tsx': 'investors/unclaimed-unpaid',
  'UnclaimedCTA.tsx': 'investors/unclaimed-unpaid',

  // Investors - Credit Rating
  'RatingHero.tsx': 'investors/credit-rating',
  'RatingIntro.tsx': 'investors/credit-rating',
  'RatingAlpha.tsx': 'investors/credit-rating',
  'RatingStability.tsx': 'investors/credit-rating',
  'RatingAgencies.tsx': 'investors/credit-rating',
  'RatingArchive.tsx': 'investors/credit-rating',
  'RatingDetailModal.tsx': 'investors/credit-rating',
  'RatingCTA.tsx': 'investors/credit-rating',

  // Investors - SEBI Disclosures
  'SEBIDisclosureHero.tsx': 'investors/sebi-disclosures',
  'SEBIDisclosureIntro.tsx': 'investors/sebi-disclosures',
  'SEBIDisclosureListing.tsx': 'investors/sebi-disclosures',
  'SEBIDisclosureFilter.tsx': 'investors/sebi-disclosures',
  'SEBIDisclosureDetailModal.tsx': 'investors/sebi-disclosures',
  'SEBIDisclosureComplianceStatement.tsx': 'investors/sebi-disclosures',
  'SEBIDisclosureCTA.tsx': 'investors/sebi-disclosures',

  // Investors - Shared Foundation
  'GenericInvestorComponents.tsx': 'investors/shared',

  // Media - Blog
  'BlogHero.tsx': 'media/blog',
  'BlogFeatured.tsx': 'media/blog',
  'BlogFilter.tsx': 'media/blog',
  'BlogGrid.tsx': 'media/blog',
  'BlogDetailModal.tsx': 'media/blog',
  'BlogCTA.tsx': 'media/blog',
  'RelatedArticles.tsx': 'media/blog',

  // Media - Events
  'EventsHero.tsx': 'media/events',
  'EventPhotos.tsx': 'media/events',
  'CorporateActivities.tsx': 'media/events',
  'ExhibitionHighlights.tsx': 'media/events',
  'PastEvents.tsx': 'media/events',
  'UpcomingEvents.tsx': 'media/events',
  'EventAwards.tsx': 'media/events',
  'EventDetailModal.tsx': 'media/events',
  'EventsCTA.tsx': 'media/events',

  // Media - Gallery
  'GalleryHero.tsx': 'media/gallery',
  'GalleryFeatured.tsx': 'media/gallery',
  'GalleryFilter.tsx': 'media/gallery',
  'GalleryGrid.tsx': 'media/gallery',
  'GalleryProcessStory.tsx': 'media/gallery',
  'GalleryVideo.tsx': 'media/gallery',
  'GalleryCTA.tsx': 'media/gallery',

  // Media - Press
  'MediaMentions.tsx': 'media/press',

  // Careers
  'CareersHero.tsx': 'careers',
  'CareersIntro.tsx': 'careers',
  'CareersValues.tsx': 'careers',
  'CareersCulture.tsx': 'careers',
  'CareersBenefits.tsx': 'careers',
  'CareersRoadmap.tsx': 'careers',
  'CareersOpenings.tsx': 'careers',
  'CareersCTA.tsx': 'careers',
  'JobHero.tsx': 'careers',
  'JobSummary.tsx': 'careers',
  'JobSpecs.tsx': 'careers',
  'JobResponsibilities.tsx': 'careers',
  'JobCompetencies.tsx': 'careers',
  'JobPerks.tsx': 'careers',
  'JobRelated.tsx': 'careers',
  'JobApplicationForm.tsx': 'careers',
  'JobDetailCTA.tsx': 'careers',

  // Contact
  'ContactHero.tsx': 'contact',
  'ContactIntro.tsx': 'contact',
  'ContactSupportInfo.tsx': 'contact',
  'ContactBlocks.tsx': 'contact',
  'ContactForm.tsx': 'contact',
  'ContactMap.tsx': 'contact',
  'ContactCTA.tsx': 'contact',

  // Customers
  'CustomersHero.tsx': 'customers',
  'CustomerPartnershipStats.tsx': 'customers',
  'CustomerIndustries.tsx': 'customers',
  'CustomerCaseStudies.tsx': 'customers',
  'CustomerKeyHighlights.tsx': 'customers',
  'CustomerTestimonials.tsx': 'customers',
  'ClientLogosGrid.tsx': 'customers',
  'Clients.tsx': 'customers',
  'CustomersCTA.tsx': 'customers',

  // Quality
  'QualityHero.tsx': 'quality',
  'QualityCommitment.tsx': 'quality',
  'QualityCertifications.tsx': 'quality',
  'QualityProcess.tsx': 'quality',
  'TestingFacilities.tsx': 'quality',
  'QualityCompliance.tsx': 'quality',
  'QualityImprovement.tsx': 'quality',
  'QualityTrust.tsx': 'quality',
  'Achievements.tsx': 'quality',
  'QualityCTA.tsx': 'quality',

  // Newsletter
  'NewsletterHero.tsx': 'newsletter',
  'NewsletterIntro.tsx': 'newsletter',
  'NewsletterGrid.tsx': 'newsletter',
  'NewsletterFilter.tsx': 'newsletter',
  'NewsletterSubscribe.tsx': 'newsletter',
  'NewsletterCTA.tsx': 'newsletter',

  // Shared
  'Navbar.tsx': 'shared',
  'Footer.tsx': 'shared',
  'ThemeToggle.tsx': 'shared',
  'theme-provider.tsx': 'shared',
  'SmoothScroll.tsx': 'shared',
  'WaveAnimation.tsx': 'shared',
  'BrandIcons.tsx': 'shared',
  'CompanyMap.tsx': 'shared',
  'GlobalGlobe.tsx': 'shared',

  // UI
  'glowing-wave.tsx': 'ui',
  'neon-reveal.tsx': 'ui',
  'slider.tsx': 'ui'
};

function main() {
  console.log('--- STARTING COMPONENT REORGANIZATION ---');

  // Ensure extra subdirectories in products
  ['all', 'brass', 'copper', 'steel'].forEach(sub => {
    const dir = path.join(ROOT_COMPONENTS, 'products', sub);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    // Write placeholder index.ts for empty material folders
    const idxFile = path.join(dir, 'index.ts');
    if (!fs.existsSync(idxFile)) {
      fs.writeFileSync(idxFile, `// ${sub} products catalog\nexport {};\n`);
    }
  });

  const folderExports = {}; // folder -> array of base filenames

  let movedCount = 0;
  for (const [filename, targetFolder] of Object.entries(fileMapping)) {
    const srcPath = path.join(ROOT_COMPONENTS, filename);
    const destDir = path.join(ROOT_COMPONENTS, targetFolder);
    const destPath = path.join(destDir, filename);

    if (fs.existsSync(srcPath)) {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.renameSync(srcPath, destPath);
      movedCount++;
    }

    if (!folderExports[targetFolder]) folderExports[targetFolder] = [];
    const baseName = filename.replace(/\.(tsx|ts)$/, '');
    folderExports[targetFolder].push(baseName);
  }

  console.log(`Successfully moved ${movedCount} component files into subdirectories.`);

  // Create index.ts in each target folder
  for (const [folder, files] of Object.entries(folderExports)) {
    const dir = path.join(ROOT_COMPONENTS, folder);
    const indexFile = path.join(dir, 'index.ts');
    const exports = files.map(f => `export * from "./${f}";`).join('\n');
    fs.writeFileSync(indexFile, `${exports}\n`);
  }

  // Create intermediate parent index.ts for investors, media, products
  const parentFolders = ['investors', 'media', 'products'];
  for (const parent of parentFolders) {
    const parentDir = path.join(ROOT_COMPONENTS, parent);
    const subEntries = fs.readdirSync(parentDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    const parentExports = subEntries
      .map(sub => `export * from "./${sub}";`)
      .join('\n');
    
    fs.writeFileSync(path.join(parentDir, 'index.ts'), `${parentExports}\n`);
  }

  // Create root src/components/index.ts that re-exports everything
  const allSubFolders = [
    'home',
    'about',
    'products',
    'investors',
    'media',
    'careers',
    'contact',
    'customers',
    'quality',
    'newsletter',
    'shared',
    'ui'
  ];

  const rootExports = allSubFolders
    .map(sub => `export * from "./${sub}";`)
    .join('\n');

  fs.writeFileSync(path.join(ROOT_COMPONENTS, 'index.ts'), `${rootExports}\n`);
  console.log('Generated all barrel exports (folder-level index.ts and root src/components/index.ts).');
}

main();
