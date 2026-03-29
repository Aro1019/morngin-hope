/* Configuration Stripe */
/* Client côté serveur pour créer les sessions de paiement */
/* Instanciation paresseuse pour éviter les erreurs au moment du build */

import Stripe from 'stripe';

/* Instance Stripe créée uniquement à l'appel (pas au build) */
let _stripe: Stripe | null = null;

export function obtenirStripe(): Stripe {
  if (!_stripe) {
    const cle = process.env.STRIPE_SECRET_KEY;
    if (!cle) {
      throw new Error('STRIPE_SECRET_KEY non définie dans les variables d\'environnement.');
    }
    _stripe = new Stripe(cle, {
      apiVersion: '2026-03-25.dahlia',
    });
  }
  return _stripe;
}
