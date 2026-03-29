/* Page racine - Redirige vers la langue par défaut */
/* Next-intl gère cette redirection via le middleware */

import { redirect } from 'next/navigation';

export default function PageRacine() {
  redirect('/fr');
}

