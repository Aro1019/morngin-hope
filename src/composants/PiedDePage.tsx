/* Composant Pied de Page (Footer) */
/* Contient les liens, informations de contact et réseaux sociaux */

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function PiedDePage() {
  const t = useTranslations('PiedDePage');
  const tNav = useTranslations('Navigation');

  const annee = new Date().getFullYear();

  return (
    <footer className="bg-bleu-primaire text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne 1 : Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/morning-hope.png"
                alt="Morning Hope"
                width={40}
                height={40}
                className="w-10 h-10 brightness-0 invert"
              />
              <span className="text-xl font-bold">Morning Hope</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('liensRapides')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-200 hover:text-jaune-primaire text-sm transition-colors">
                  {tNav('accueil')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-200 hover:text-jaune-primaire text-sm transition-colors">
                  {tNav('blog')}
                </Link>
              </li>
              <li>
                <Link href="/dons" className="text-blue-200 hover:text-jaune-primaire text-sm transition-colors">
                  {tNav('dons')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-200 hover:text-jaune-primaire text-sm transition-colors">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>contact@morninghope.org</li>
              <li>+33 1 23 45 67 89</li>
            </ul>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">{t('suivezNous')}</h3>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-jaune-primaire hover:text-bleu-primaire transition-colors"
                  aria-label="Facebook"
                >
                  <span className="text-sm font-bold">f</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-jaune-primaire hover:text-bleu-primaire transition-colors"
                  aria-label="Twitter"
                >
                  <span className="text-sm font-bold">X</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-jaune-primaire hover:text-bleu-primaire transition-colors"
                  aria-label="Instagram"
                >
                  <span className="text-sm font-bold">ig</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur et copyright */}
        <div className="mt-10 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-blue-200 text-sm">
            © {annee} Morning Hope. {t('droits')}
          </p>
          <p className="text-blue-200 text-sm flex items-center gap-1">
            Fait avec <Heart className="w-4 h-4 text-jaune-primaire fill-jaune-primaire" />
          </p>
        </div>
      </div>
    </footer>
  );
}
