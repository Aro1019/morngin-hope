/* Page Article - Affiche un article de blog complet depuis Sanity */

import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { obtenirArticleParSlug } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Calendar } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

export default async function PageArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations('Blog');

  /* Récupération de l'article depuis Sanity */
  let article: {
    titre: string;
    contenu?: PortableTextBlock[];
    imageprincipale?: string;
    datePublication?: string;
    resume?: string;
  } | null = null;

  try {
    article = await obtenirArticleParSlug(slug);
  } catch {
    /* Sanity pas encore configuré */
  }

  /* Article introuvable → page 404 */
  if (!article) {
    notFound();
  }

  return (
    <>
      {/* En-tête avec image */}
      <section className="bg-gradient-to-br from-bleu-primaire to-bleu-clair text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('retour')}
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{article.titre}</h1>
          {article.datePublication && (
            <div className="flex items-center gap-2 mt-4 text-blue-200">
              <Calendar className="w-4 h-4" />
              <time>{new Date(article.datePublication).toLocaleDateString()}</time>
            </div>
          )}
        </div>
      </section>

      {/* Contenu de l'article */}
      <section className="py-12">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image principale */}
          {article.imageprincipale && (
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
              <Image
                src={article.imageprincipale}
                alt={article.titre}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Texte de l'article — rendu avec PortableText de Sanity */}
          <div className="prose prose-lg max-w-none text-texte">
            {article.contenu ? (
              <PortableText value={article.contenu} />
            ) : (
              <p className="text-texte-clair">{article.resume}</p>
            )}
          </div>
        </article>
      </section>
    </>
  );
}
