/* Route API - Envoyer un message de contact via Resend */
/* Reçoit les données du formulaire et envoie un email */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

/* Instance Resend avec la clé API */
const resend = new Resend(process.env.RESEND_API_KEY || '');

/* Validation basique d'email */
function estEmailValide(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* Nettoyage des entrées utilisateur */
function nettoyer(texte: string): string {
  return texte.trim().slice(0, 5000);
}

export async function POST(requete: NextRequest) {
  try {
    const corps = await requete.json();
    const { nom, email, sujet, message } = corps;

    /* Validation des champs obligatoires */
    if (!nom || !email || !sujet || !message) {
      return NextResponse.json(
        { erreur: 'Tous les champs sont obligatoires.' },
        { status: 400 }
      );
    }

    /* Validation de l'email */
    if (!estEmailValide(email)) {
      return NextResponse.json(
        { erreur: 'Adresse email invalide.' },
        { status: 400 }
      );
    }

    /* Nettoyage des données */
    const nomNettoye = nettoyer(nom);
    const sujetNettoye = nettoyer(sujet);
    const messageNettoye = nettoyer(message);

    /* Envoi de l'email via Resend */
    await resend.emails.send({
      from: 'Morning Hope <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'contact@morninghope.org',
      subject: `[Contact] ${sujetNettoye}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${nomNettoye}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${sujetNettoye}</p>
        <hr />
        <p>${messageNettoye.replace(/\n/g, '<br />')}</p>
      `,
      replyTo: email,
    });

    return NextResponse.json({ succes: true });
  } catch (erreur) {
    console.error('Erreur Resend:', erreur);
    return NextResponse.json(
      { erreur: "Erreur lors de l'envoi du message." },
      { status: 500 }
    );
  }
}
