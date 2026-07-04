'use client';

import HeroSection from '../components/homepage/HeroSection';
import HowItWorksSection from '../components/homepage/HowItWorksSection';
import ProductWalkthrough from '../components/homepage/ProductWalkthrough';
import StatsSection from '../components/homepage/StatsSection';
import EndorsementsSection from '../components/homepage/EndorsementsSection';
import LearnSection from '../components/homepage/LearnSection';
import CtaSection from '../components/homepage/CtaSection';

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Haem.io',
        alternateName: 'Haemio',
        url: 'https://haem.io',
        logo: 'https://haem.io/favicon.svg'
      },
      {
        '@type': 'WebSite',
        name: 'Haem.io',
        alternateName: 'Haemio',
        url: 'https://haem.io',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://haem.io/articles?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Haem.io Leukaemia Classifier',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Web',
        url: 'https://haem.io/interactive-classifier',
        description:
          'A leukaemia and myeloid disease diagnostic classifier supporting WHO 2022 and ICC 2022 classification logic.'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      <HowItWorksSection />
      <ProductWalkthrough />
      <StatsSection />
      <EndorsementsSection />
      <LearnSection />
      <CtaSection />
    </>
  );
}
