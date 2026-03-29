/* Fichier robots.txt pour le référencement */
/* Indique aux moteurs de recherche quelles pages indexer */

import type { MetadataRoute } from 'next';

const URL_SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://morninghope.org';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: `${URL_SITE}/sitemap.xml`,
  };
}
