/* Layout et métadonnées SEO pour la page Contact */

import { getTranslations } from 'next-intl/server';

const URL_SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://morninghope.org';

/* Métadonnées SEO pour la page contact */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });
  return {
    title: t('contactTitre'),
    description: t('contactDescription'),
    alternates: {
      canonical: `${URL_SITE}/${locale}/contact`,
      languages: { fr: `${URL_SITE}/fr/contact`, en: `${URL_SITE}/en/contact` },
    },
    openGraph: {
      title: t('contactTitre'),
      description: t('contactDescription'),
      url: `${URL_SITE}/${locale}/contact`,
    },
  };
}

export default function LayoutContact({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
