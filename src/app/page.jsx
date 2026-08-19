'use client';

import HeroSection from '../components/homepage/HeroSection';
import ProjectsSection from '../components/homepage/ProjectsSection';
import ProductWalkthrough from '../components/homepage/ProductWalkthrough';
import EndorsementsSection from '../components/homepage/EndorsementsSection';
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
        '@type': 'ItemList',
        name: 'Haem.io current projects',
        itemListElement: [
          { '@type': 'ListItem', position: 1, url: 'https://haem.io/projects/eln-response', name: 'AML treatment response' },
          { '@type': 'ListItem', position: 2, url: 'https://haem.io/projects/haemos', name: 'haemOS diagnostic workflow' },
          { '@type': 'ListItem', position: 3, url: 'https://haem.io/projects/cambodia', name: 'Cambodia AML workspace' }
        ]
      }
    ]
  };

  return (
    <div className="landing-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      <ProjectsSection />
      <ProductWalkthrough />
      <EndorsementsSection />
      <CtaSection />
    </div>
  );
}
