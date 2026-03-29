/* Configuration Sanity Studio */
/* Schéma pour les articles de blog */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

/* Schéma Article de blog */
const schemaArticle = {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'titre',
        maxLength: 96,
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'resume',
      title: 'Résumé',
      type: 'text',
      rows: 3,
    },
    {
      name: 'imageprincipale',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'contenu',
      title: 'Contenu',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
    },
    {
      name: 'datePublication',
      title: 'Date de publication',
      type: 'datetime',
    },
    {
      name: 'langue',
      title: 'Langue',
      type: 'string',
      options: {
        list: [
          { title: 'Français', value: 'fr' },
          { title: 'English', value: 'en' },
        ],
      },
      initialValue: 'fr',
    },
  ],
  orderings: [
    {
      title: 'Date de publication',
      name: 'datePublicationDesc',
      by: [{ field: 'datePublication', direction: 'desc' }],
    },
  ],
};

/* Export de la configuration Sanity */
export default defineConfig({
  name: 'morning-hope-studio',
  title: 'Morning Hope - Back Office',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'votre-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [schemaArticle],
  },
});
lo