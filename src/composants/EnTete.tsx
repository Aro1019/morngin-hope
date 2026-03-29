/* Composant En-tête (Header) */
/* Barre de navigation principale avec menu responsive et sélecteur de langue */

'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useParams } from 'next/navigation';
import type { Locale } from '@/i18n';

export default function EnTete() {
  const t = useTranslations('Navigation');
  const cheminActuel = usePathname();
  const routeur = useRouter();
  const params = useParams();
  const langueActuelle = (params.locale as Locale) || 'fr';
  const [menuOuvert, setMenuOuvert] = useState(false);

  /* Liens de navigation */
  const liens = [
    { href: '/' as const, label: t('accueil') },
    { href: '/blog' as const, label: t('blog') },
    { href: '/dons' as const, label: t('dons') },
    { href: '/contact' as const, label: t('contact') },
  ];

  /* Changement de langue */
  const changerLangue = () => {
    const nouvelleLang = langueActuelle === 'fr' ? 'en' : 'fr';
    routeur.replace(cheminActuel, { locale: nouvelleLang });
  };

  /* Vérifier si le lien est actif */
  const estActif = (href: string) => {
    if (href === '/') return cheminActuel === '/';
    return cheminActuel.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-bordure">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/assets/morning-hope.png"
              alt="Morning Hope"
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12"
              priority
            />
            <span className="text-lg md:text-xl font-bold text-bleu-primaire hidden sm:block">
              Morning Hope
            </span>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-1">
            {liens.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  estActif(lien.href)
                    ? 'bg-bleu-primaire text-white'
                    : 'text-texte hover:bg-bleu-tres-clair hover:text-bleu-primaire'
                }`}
              >
                {lien.label}
              </Link>
            ))}
          </div>

          {/* Actions (langue + menu mobile) */}
          <div className="flex items-center gap-2">
            {/* Sélecteur de langue */}
            <button
              onClick={changerLangue}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-texte-clair hover:bg-gris-clair transition-colors"
              aria-label="Changer de langue"
            >
              <Globe className="w-4 h-4" />
              <span>{t('langue')}</span>
            </button>

            {/* Bouton don (desktop) */}
            <Link
              href="/dons"
              className="hidden md:flex items-center px-5 py-2.5 bg-jaune-primaire text-bleu-primaire rounded-lg font-semibold text-sm hover:bg-jaune-clair transition-colors shadow-sm"
            >
              {t('dons')}
            </Link>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setMenuOuvert(!menuOuvert)}
              className="md:hidden p-2 rounded-lg text-texte hover:bg-gris-clair"
              aria-label="Menu"
            >
              {menuOuvert ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOuvert && (
          <div className="md:hidden pb-4 border-t border-bordure pt-4 space-y-1">
            {liens.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                onClick={() => setMenuOuvert(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                  estActif(lien.href)
                    ? 'bg-bleu-primaire text-white'
                    : 'text-texte hover:bg-bleu-tres-clair'
                }`}
              >
                {lien.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
