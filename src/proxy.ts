/* Proxy pour la gestion des langues */
/* Redirige automatiquement vers la bonne langue (remplace middleware dans Next.js 16) */

import createMiddleware from 'next-intl/middleware';
import { routing } from '@/navigation';

/* Création du proxy de redirection des langues */
const intlMiddleware = createMiddleware(routing);

/* Export nommé 'proxy' requis par Next.js 16 */
export const proxy = intlMiddleware;

/* Configuration des chemins gérés par le proxy */
export const config = {
  matcher: [
    /* Tous les chemins sauf API, fichiers statiques et studio Sanity */
    '/((?!api|_next|_vercel|studio|.*\\..*).*)',
  ],
};
