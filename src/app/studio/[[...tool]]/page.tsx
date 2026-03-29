/* Page Sanity Studio - Interface d'administration */
/* Accessible via /studio */

'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function PageStudio() {
  return <NextStudio config={config} />;
}
