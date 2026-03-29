/* Composant Données Structurées JSON-LD */
/* Fournit les données structurées pour les moteurs de recherche (Google Rich Results) */

const URL_SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://morninghope.org';

export default function DonneesStructurees({ locale }: { locale: string }) {
  /* Schéma Organisation pour Google */
  const schemaOrganisation = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Morning Hope',
    url: `${URL_SITE}/${locale}`,
    logo: `${URL_SITE}/assets/morning-hope.png`,
    description:
      locale === 'fr'
        ? "Association caritative dédiée à la protection des enfants, au bien-être des familles et au développement durable."
        : "Charitable organization dedicated to child protection, family well-being, and sustainable development.",
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33-1-23-45-67-89',
      contactType: 'customer service',
      email: 'contact@morninghope.org',
      availableLanguage: ['French', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
    sameAs: [
      'https://facebook.com/morninghope',
      'https://twitter.com/morninghope',
      'https://instagram.com/morninghope',
    ],
    nonprofitStatus: 'Nonprofit501c3',
    areaServed: {
      '@type': 'Place',
      name: 'International',
    },
  };

  /* Schéma Site Web pour le moteur de recherche */
  const schemaSiteWeb = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Morning Hope',
    url: `${URL_SITE}/${locale}`,
    inLanguage: locale === 'fr' ? 'fr-FR' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${URL_SITE}/${locale}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrganisation),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaSiteWeb),
        }}
      />
    </>
  );
}
