/* Configuration Sanity CMS */
/* Client pour récupérer les données du blog */

import { createClient } from '@sanity/client';

/* Client Sanity configuré avec les variables d'environnement */
export const clientSanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, /* Utiliser le CDN pour des performances optimales */
});

/* Récupérer tous les articles de blog */
export async function obtenirTousLesArticles() {
  const requete = `*[_type == "article"] | order(datePublication desc) {
    _id,
    titre,
    slug,
    resume,
    "imageprincipale": imageprincipale.asset->url,
    datePublication
  }`;

  return clientSanity.fetch(requete);
}

/* Récupérer un article par son slug */
export async function obtenirArticleParSlug(slug: string) {
  const requete = `*[_type == "article" && slug.current == $slug][0] {
    titre,
    contenu,
    "imageprincipale": imageprincipale.asset->url,
    datePublication,
    resume
  }`;

  return clientSanity.fetch(requete, { slug });
}
