/* Page Blog - Liste des articles depuis Sanity */
/* Affiche les articles du blog avec pagination */

import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { obtenirTousLesArticles } from '@/lib/sanity';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';

const URL_SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://morninghope.org';

/* Métadonnées SEO spécifiques à la page blog */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });
  return {
    title: t('blogTitre'),
    description: t('blogDescription'),
    alternates: {
      canonical: `${URL_SITE}/${locale}/blog`,
      languages: { fr: `${URL_SITE}/fr/blog`, en: `${URL_SITE}/en/blog` },
    },
    openGraph: {
      title: t('blogTitre'),
      description: t('blogDescription'),
      url: `${URL_SITE}/${locale}/blog`,
    },
  };
}

export default async function PageBlog() {
  const t = await getTranslations('Blog');

  /* Récupération des articles depuis Sanity */
  let articles: Array<{
    _id: string;
    titre: string;
    slug: { current: string };
    resume?: string;
    imageprincipale?: string;
    datePublication?: string;
  }> = [];

  try {
    articles = await obtenirTousLesArticles();
  } catch {
    /* Sanity pas encore configuré - on affiche un message vide */
  }

  return (
    <>
      {/* En-tête de la page */}
      <section className="bg-gradient-to-br from-bleu-primaire to-bleu-clair text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('titre')}</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">{t('sousTitre')}</p>
        </div>
      </section>

      {/* Liste des articles */}
      <section className="py-16 bg-gris-clair">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            /* Message si aucun article */
            <div className="text-center py-20">
              <p className="text-texte-clair text-lg">{t('aucunArticle')}</p>
              <p className="text-sm text-texte-clair mt-2">
                Configurez Sanity pour ajouter du contenu.
              </p>
            </div>
          ) : (
            /* Grille d'articles */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  key={article._id}
                  href={`/blog/${article.slug.current}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-bordure"
                >
                  {/* Image de l'article */}
                  {article.imageprincipale && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.imageprincipale}
                        alt={article.titre}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Contenu de la carte */}
                  <div className="p-6 space-y-3">
                    {article.datePublication && (
                      <div className="flex items-center gap-2 text-sm text-texte-clair">
                        <Calendar className="w-4 h-4" />
                        <time>{new Date(article.datePublication).toLocaleDateString()}</time>
                      </div>
                    )}
                    <h2 className="text-xl font-semibold text-bleu-primaire group-hover:text-bleu-clair transition-colors">
                      {article.titre}
                    </h2>
                    {article.resume && (
                      <p className="text-texte-clair text-sm line-clamp-3">{article.resume}</p>
                    )}
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-jaune-primaire">
                      {t('lirePlus')} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
