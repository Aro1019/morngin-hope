/* Page Dons - Formulaire de don avec Stripe Checkout */
/* Permet aux utilisateurs de faire un don sécurisé */

'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Heart, Shield, Check } from 'lucide-react';

/* Montants prédéfinis pour les dons */
const MONTANTS_PREDIFINIS = [10, 25, 50, 100];

export default function PageDons() {
  const t = useTranslations('Dons');
  const [montantSelectionne, setMontantSelectionne] = useState<number | null>(25);
  const [montantPersonnalise, setMontantPersonnalise] = useState('');
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState('');

  /* Calcul du montant final */
  const montantFinal = montantPersonnalise
    ? parseFloat(montantPersonnalise)
    : montantSelectionne;

  /* Gérer la soumission du don via Stripe */
  const gererDon = async () => {
    if (!montantFinal || montantFinal < 1) return;

    setChargement(true);
    setErreur('');

    try {
      const reponse = await fetch('/api/creer-session-don', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ montant: montantFinal }),
      });

      const donnees = await reponse.json();

      if (donnees.url) {
        /* Redirection vers Stripe Checkout */
        window.location.href = donnees.url;
      } else {
        setErreur(t('erreur'));
      }
    } catch {
      setErreur(t('erreur'));
    } finally {
      setChargement(false);
    }
  };

  /* Raisons de donner */
  const raisons = [
    t('pourquoi1'),
    t('pourquoi2'),
    t('pourquoi3'),
    t('pourquoi4'),
  ];

  return (
    <>
      {/* En-tête de la page */}
      <section className="bg-gradient-to-br from-bleu-primaire to-bleu-clair text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-jaune-primaire" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('titre')}</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">{t('sousTitre')}</p>
        </div>
      </section>

      {/* Formulaire de don */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Colonne gauche : formulaire */}
            <div className="bg-white rounded-2xl shadow-sm border border-bordure p-8 space-y-8">
              {/* Montants prédéfinis */}
              <div>
                <h2 className="text-xl font-semibold text-bleu-primaire mb-4">
                  {t('titre')}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {MONTANTS_PREDIFINIS.map((montant) => (
                    <button
                      key={montant}
                      onClick={() => {
                        setMontantSelectionne(montant);
                        setMontantPersonnalise('');
                      }}
                      className={`py-4 px-6 rounded-xl text-lg font-semibold transition-all border-2 ${
                        montantSelectionne === montant && !montantPersonnalise
                          ? 'border-bleu-primaire bg-bleu-tres-clair text-bleu-primaire'
                          : 'border-bordure text-texte hover:border-bleu-clair'
                      }`}
                    >
                      {montant} €
                    </button>
                  ))}
                </div>
              </div>

              {/* Montant personnalisé */}
              <div>
                <label className="block text-sm font-medium text-texte mb-2">
                  {t('montantLibre')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="100000"
                    step="1"
                    value={montantPersonnalise}
                    onChange={(e) => {
                      setMontantPersonnalise(e.target.value);
                      setMontantSelectionne(null);
                    }}
                    placeholder="0"
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-bordure focus:border-bleu-clair focus:outline-none text-lg"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-texte-clair font-medium">
                    €
                  </span>
                </div>
              </div>

              {/* Bouton de paiement */}
              <button
                onClick={gererDon}
                disabled={chargement || !montantFinal || montantFinal < 1}
                className="w-full py-4 bg-jaune-primaire text-bleu-primaire rounded-xl font-bold text-lg hover:bg-jaune-clair transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {chargement ? '...' : t('boutonPayer')}
              </button>

              {/* Message d'erreur */}
              {erreur && (
                <p className="text-red-500 text-sm text-center">{erreur}</p>
              )}

              {/* Indicateur de sécurité */}
              <div className="flex items-center justify-center gap-2 text-sm text-texte-clair">
                <Shield className="w-4 h-4" />
                <span>{t('securise')}</span>
              </div>
            </div>

            {/* Colonne droite : pourquoi donner */}
            <div className="space-y-8">
              <div className="bg-jaune-tres-clair rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-bleu-primaire mb-6">
                  {t('pourquoiTitre')}
                </h3>
                <ul className="space-y-4">
                  {raisons.map((raison, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-jaune-primaire rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-texte">{raison}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Carte de confiance */}
              <div className="bg-bleu-tres-clair rounded-2xl p-8 text-center">
                <Heart className="w-10 h-10 mx-auto mb-3 text-bleu-primaire" />
                <p className="text-bleu-primaire font-semibold text-lg">
                  100% transparent
                </p>
                <p className="text-texte-clair text-sm mt-2">
                  Chaque euro est directement investi dans nos programmes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
