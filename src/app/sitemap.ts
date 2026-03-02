import type { MetadataRoute } from 'next';

const BASE_URL = 'https://haem.io';

const ROUTES = [
  '/',
  '/interactive-classifier',
  '/leukemia-diagnostic-tool',
  '/aml-classifier',
  '/mds-vs-aml-diagnosis',
  '/source-docs',
  '/methodology',
  '/validation-evidence',
  '/vision',
  '/roadmap',
  '/articles',
  '/articles/version-control-of-medicine',
  '/articles/signal-vs-execution',
  '/articles/neurosymbolic-diagnostic-algorithms-imandra',
  '/expansion-thesis',
  '/team'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7
  }));
}
