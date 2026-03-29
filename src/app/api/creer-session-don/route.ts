/* Route API - Créer une session de don Stripe */
/* Reçoit un montant et crée une session Stripe Checkout */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(requete: NextRequest) {
  try {
    const corps = await requete.json();
    const { montant } = corps;

    /* Validation du montant */
    if (!montant || typeof montant !== 'number' || montant < 1 || montant > 100000) {
      return NextResponse.json(
        { erreur: 'Montant invalide. Le montant doit être entre 1 et 100 000 €.' },
        { status: 400 }
      );
    }

    /* Arrondir à 2 décimales et convertir en centimes */
    const montantCentimes = Math.round(montant * 100);

    /* Créer la session Stripe Checkout */
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Don à Morning Hope',
              description: 'Merci pour votre générosité envers Morning Hope.',
            },
            unit_amount: montantCentimes,
          },
          quantity: 1,
        },
      ],
      /* URLs de redirection après paiement */
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/fr/dons?succes=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/fr/dons`,
    });

    return NextResponse.json({ url: session.url });
  } catch (erreur) {
    console.error('Erreur Stripe:', erreur);
    return NextResponse.json(
      { erreur: 'Erreur lors de la création de la session de paiement.' },
      { status: 500 }
    );
  }
}
