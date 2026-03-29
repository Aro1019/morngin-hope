/* Layout avec locale - Contient le header, le footer et le fournisseur de traductions */
/* Gère les métadonnées SEO, Open Graph, hreflang et JSON-LD */

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist } from 'next/font/google';
import { locales } from '@/i18n';
import type { Metadata } from 'next';
import EnTete from '@/composants/EnTete';
import PiedDePage from '@/composants/PiedDePage';
import DonneesStructurees from '@/composants/DonneesStructurees';

/* Police principale */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* URL de base du site */
const URL_SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://morninghope.org';

/* Métadonnées dynamiques selon la langue avec Open Graph et Twitter Cards */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  /* Langue alternative pour le hreflang */
  const autreLocale = locale === 'fr' ? 'en' : 'fr';

  return {
    title: {
      default: messages.Metadata.titre,
      template: `%s | Morning Hope`,
    },
    description: messages.Metadata.description,
    keywords: messages.Metadata.motsCles,

    /* URL canonique */
    alternates: {
      canonical: `${URL_SITE}/${locale}`,
      languages: {
        'fr': `${URL_SITE}/fr`,
        'en': `${URL_SITE}/en`,
        'x-default': `${URL_SITE}/fr`,
      },
    },

    /* Open Graph pour les réseaux sociaux (Facebook, LinkedIn) */
    openGraph: {
      title: messages.Metadata.titre,
      description: messages.Metadata.description,
      url: `${URL_SITE}/${locale}`,
      siteName: 'Morning Hope',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: `${URL_SITE}/assets/morning-hope.png`,
          width: 1200,
          height: 630,
          alt: 'Morning Hope - Association Caritative',
        },
      ],
    },

    /* Twitter Cards */
    twitter: {
      card: 'summary_large_image',
      title: messages.Metadata.titre,
      description: messages.Metadata.description,
      images: [`${URL_SITE}/assets/morning-hope.png`],
    },

    /* Robots - indexation autorisée */
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    /* Métadonnées supplémentaires */
    metadataBase: new URL(URL_SITE),
    category: 'nonprofit',
  };
}

/* Génération statique des pages pour chaque langue */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LayoutLocale({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  /* Vérification que la langue demandée est supportée */
  if (!hasLocale(locales, locale)) {
    notFound();
  }

  /* Chargement des messages de traduction */
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-fond text-texte">
        <NextIntlClientProvider messages={messages}>
          {/* Données structurées JSON-LD pour Google */}
          <DonneesStructurees locale={locale} />

          {/* En-tête du site */}
          <EnTete />

          {/* Contenu principal */}
          <main className="flex-1">
            {children}
          </main>

          {/* Pied de page */}
          <PiedDePage />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
