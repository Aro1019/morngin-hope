/* Page d'accueil - Vitrine principale de l'association */
/* Présente la mission, les objectifs et un appel aux dons */

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Shield, Heart, BookOpen, Users, GraduationCap, TreePine, HandHeart, MessageCircle } from 'lucide-react';

const URL_SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://morninghope.org';

/* Métadonnées SEO spécifiques à la page d'accueil */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });
  return {
    title: t('accueilTitre'),
    description: t('accueilDescription'),
    alternates: {
      canonical: `${URL_SITE}/${locale}`,
      languages: { fr: `${URL_SITE}/fr`, en: `${URL_SITE}/en` },
    },
    openGraph: {
      title: t('accueilTitre'),
      description: t('accueilDescription'),
      url: `${URL_SITE}/${locale}`,
    },
  };
}

export default function PageAccueil() {
  const t = useTranslations('Accueil');

  /* Liste des objectifs avec icônes */
  const objectifs = [
    { cle: 'objectif1', Icone: Shield },
    { cle: 'objectif2', Icone: Heart },
    { cle: 'objectif3', Icone: BookOpen },
    { cle: 'objectif4', Icone: Users },
    { cle: 'objectif5', Icone: GraduationCap },
    { cle: 'objectif6', Icone: HandHeart },
    { cle: 'objectif7', Icone: MessageCircle },
    { cle: 'objectif8', Icone: TreePine },
  ];

  /* Statistiques d'impact */
  const statistiques = [
    { nombre: '5 000+', label: t('impactEnfants') },
    { nombre: '1 200+', label: t('impactFamilles') },
    { nombre: '50+', label: t('impactProjets') },
    { nombre: '30+', label: t('impactPartenaires') },
  ];

  return (
    <>
      {/* ===== Section héros ===== */}
      <section className="relative bg-gradient-to-br from-bleu-primaire via-bleu-clair to-bleu-primaire text-white overflow-hidden">
        {/* Motif décoratif */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-jaune-primaire rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-jaune-clair rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animer-apparition">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('heroTitre')}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-lg">
                {t('heroSousTitre')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dons"
                  className="inline-flex items-center justify-center px-8 py-4 bg-jaune-primaire text-bleu-primaire rounded-xl font-bold text-lg hover:bg-jaune-clair transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  {t('boutonDon')}
                </Link>
                <a
                  href="#mission"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  {t('boutonDecouvrir')}
                </a>
              </div>
            </div>

            {/* Logo grand format */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl" />
                <Image
                  src="/assets/morning-hope.png"
                  alt="Morning Hope"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vague décorative en bas */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full">
            <path d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 32C840 40 960 48 1080 44C1200 40 1320 24 1380 16L1440 8V80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ===== Section mission ===== */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-jaune-tres-clair text-jaune-primaire rounded-full text-sm font-semibold">
              <Heart className="w-4 h-4" />
              <span>Morning Hope</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-bleu-primaire">
              {t('missionTitre')}
            </h2>
            <p className="text-lg text-texte-clair leading-relaxed">
              {t('missionDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* ===== Section objectifs ===== */}
      <section className="py-20 bg-gris-clair">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-bleu-primaire mb-16">
            {t('objectifsTitre')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectifs.map(({ cle, Icone }) => (
              <div
                key={cle}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-bordure group"
              >
                <div className="w-12 h-12 bg-bleu-tres-clair rounded-xl flex items-center justify-center mb-4 group-hover:bg-jaune-primaire transition-colors">
                  <Icone className="w-6 h-6 text-bleu-primaire group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-bleu-primaire mb-2">
                  {t(`${cle}Titre`)}
                </h3>
                <p className="text-sm text-texte-clair leading-relaxed">
                  {t(`${cle}Description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section statistiques d'impact ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-bleu-primaire mb-16">
            {t('impactTitre')}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistiques.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-bold text-jaune-primaire">
                  {stat.nombre}
                </p>
                <p className="text-texte-clair font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section appel à l'action ===== */}
      <section className="py-20 bg-gradient-to-r from-bleu-primaire to-bleu-clair text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('appelActionTitre')}
          </h2>
          <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
            {t('appelActionDescription')}
          </p>
          <Link
            href="/dons"
            className="inline-flex items-center justify-center px-10 py-4 bg-jaune-primaire text-bleu-primaire rounded-xl font-bold text-lg hover:bg-jaune-clair transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {t('appelActionBouton')}
          </Link>
        </div>
      </section>
    </>
  );
}
