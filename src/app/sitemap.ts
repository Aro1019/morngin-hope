/* Sitemap.xml dynamique pour le référencement */
/* Génère automatiquement la liste de toutes les pages du site pour Google */

import type { MetadataRoute } from 'next';

const URL_SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://morninghope.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const dateModification = new Date().toISOString();

  /* Pages statiques du site dans chaque langue */
  const pagesStatiques = [
    { chemin: '', priorite: 1.0, frequence: 'weekly' as const },
    { chemin: '/blog', priorite: 0.8, frequence: 'daily' as const },
    { chemin: '/dons', priorite: 0.9, frequence: 'monthly' as const },
    { chemin: '/contact', priorite: 0.7, frequence: 'monthly' as const },
  ];

  const locales = ['fr', 'en'];

  /* Générer les entrées pour chaque page dans chaque langue */
  const entrees: MetadataRoute.Sitemap = [];

  for (const page of pagesStatiques) {
    for (const locale of locales) {
      entrees.push({
        url: `${URL_SITE}/${locale}${page.chemin}`,
        lastModified: dateModification,
        changeFrequency: page.frequence,
        priority: page.priorite,
        alternates: {
          languages: {
            fr: `${URL_SITE}/fr${page.chemin}`,
            en: `${URL_SITE}/en${page.chemin}`,
          },
        },
      });
    }
  }

  return entrees;
}
