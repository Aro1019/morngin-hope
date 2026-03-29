/* Configuration Next.js */
/* Intégration de next-intl pour le multi-langue */

import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

/* Plugin next-intl pour la gestion des traductions */
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  /* Optimisation des images */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
