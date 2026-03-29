/* Page Contact - Formulaire de contact avec envoi via Resend */

'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

export default function PageContact() {
  const t = useTranslations('Contact');
  const [formulaire, setFormulaire] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: '',
  });
  const [envoi, setEnvoi] = useState(false);
  const [succes, setSucces] = useState(false);
  const [erreur, setErreur] = useState('');

  /* Gérer les changements dans le formulaire */
  const gererChangement = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormulaire({ ...formulaire, [e.target.name]: e.target.value });
  };

  /* Soumettre le formulaire */
  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnvoi(true);
    setErreur('');
    setSucces(false);

    try {
      const reponse = await fetch('/api/envoyer-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulaire),
      });

      if (reponse.ok) {
        setSucces(true);
        setFormulaire({ nom: '', email: '', sujet: '', message: '' });
      } else {
        setErreur(t('erreur'));
      }
    } catch {
      setErreur(t('erreur'));
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <>
      {/* En-tête de la page */}
      <section className="bg-gradient-to-br from-bleu-primaire to-bleu-clair text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-12 h-12 mx-auto mb-4 text-jaune-primaire" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('titre')}</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">{t('sousTitre')}</p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Informations de contact */}
            <div className="space-y-6">
              {/* Adresse */}
              <div className="flex items-start gap-4 p-6 bg-bleu-tres-clair rounded-2xl">
                <MapPin className="w-6 h-6 text-bleu-primaire shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-bleu-primaire">{t('adresse')}</h3>
                  <p className="text-texte-clair text-sm mt-1">
                    123 Rue de l&apos;Espoir<br />
                    75001 Paris, France
                  </p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start gap-4 p-6 bg-bleu-tres-clair rounded-2xl">
                <Phone className="w-6 h-6 text-bleu-primaire shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-bleu-primaire">{t('telephone')}</h3>
                  <p className="text-texte-clair text-sm mt-1">
                    +33 1 23 45 67 89
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-6 bg-bleu-tres-clair rounded-2xl">
                <Mail className="w-6 h-6 text-bleu-primaire shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-bleu-primaire">{t('emailContact')}</h3>
                  <p className="text-texte-clair text-sm mt-1">
                    contact@morninghope.org
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <form onSubmit={gererSoumission} className="bg-white rounded-2xl shadow-sm border border-bordure p-8 space-y-6">
                {/* Message de succès */}
                {succes && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                    {t('succes')}
                  </div>
                )}

                {/* Message d'erreur */}
                {erreur && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {erreur}
                  </div>
                )}

                {/* Nom */}
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-texte mb-2">
                    {t('nom')}
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    required
                    value={formulaire.nom}
                    onChange={gererChangement}
                    className="w-full px-4 py-3 rounded-xl border-2 border-bordure focus:border-bleu-clair focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-texte mb-2">
                    {t('email')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formulaire.email}
                    onChange={gererChangement}
                    className="w-full px-4 py-3 rounded-xl border-2 border-bordure focus:border-bleu-clair focus:outline-none"
                  />
                </div>

                {/* Sujet */}
                <div>
                  <label htmlFor="sujet" className="block text-sm font-medium text-texte mb-2">
                    {t('sujet')}
                  </label>
                  <input
                    id="sujet"
                    name="sujet"
                    type="text"
                    required
                    value={formulaire.sujet}
                    onChange={gererChangement}
                    className="w-full px-4 py-3 rounded-xl border-2 border-bordure focus:border-bleu-clair focus:outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-texte mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formulaire.message}
                    onChange={gererChangement}
                    className="w-full px-4 py-3 rounded-xl border-2 border-bordure focus:border-bleu-clair focus:outline-none resize-none"
                  />
                </div>

                {/* Bouton d'envoi */}
                <button
                  type="submit"
                  disabled={envoi}
                  className="w-full py-4 bg-bleu-primaire text-white rounded-xl font-semibold text-lg hover:bg-bleu-clair transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {envoi ? t('envoi') : t('envoyer')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
