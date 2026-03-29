/* Layout et métadonnées SEO pour la page Dons */

import { getTranslations } from 'next-intl/server';

const URL_SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://morninghope.org';

/* Métadonnées SEO pour la page dons */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });
  return {
    title: t('donsTitre'),
    description: t('donsDescription'),
    alternates: {
      canonical: `${URL_SITE}/${locale}/dons`,
      languages: { fr: `${URL_SITE}/fr/dons`, en: `${URL_SITE}/en/dons` },
    },
    openGraph: {
      title: t('donsTitre'),
      description: t('donsDescription'),
      url: `${URL_SITE}/${locale}/dons`,
    },
  };
}

export default function LayoutDons({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
