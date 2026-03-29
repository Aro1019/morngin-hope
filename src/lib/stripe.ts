/* Configuration Stripe */
/* Client côté serveur pour créer les sessions de paiement */

import Stripe from 'stripe';

/* Instance Stripe avec la clé secrète */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-03-25.dahlia',
});
