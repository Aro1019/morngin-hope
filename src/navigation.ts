/* Navigation i18n - Définit les chemins localisés */

import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './i18n';

/* Configuration du routage avec les langues supportées */
/* localePrefix: 'always' → garde toujours /fr et /en dans l'URL pour éviter les redirections */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

/* Composants de navigation localisés */
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
